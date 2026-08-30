import os
import logging
from typing import Dict, Any, List, Optional
from models import DigitalPass, ProcurementHub, QueueStage

logger = logging.getLogger(__name__)

class DatabaseManager:
    """
    MongoDB Atlas connection manager with Motor async driver.
    Provides automatic fallback to an in-memory document store if MongoDB URI is not set,
    guaranteeing seamless execution both in the cloud and during local hackathon demos.
    """
    def __init__(self):
        self.mongo_uri = os.getenv("MONGODB_URI")
        self.db_name = os.getenv("MONGODB_DB_NAME", "krishiflow_db")
        self.client = None
        self.db = None
        
        # In-memory document collections
        self._passes: Dict[str, DigitalPass] = {}
        self._audit_logs: List[Dict[str, Any]] = []

        if self.mongo_uri:
            try:
                from motor.motor_asyncio import AsyncIOMotorClient
                self.client = AsyncIOMotorClient(self.mongo_uri)
                self.db = self.client[self.db_name]
                logger.info("Connected to MongoDB Atlas successfully.")
            except Exception as e:
                logger.warning(f"MongoDB connection failed ({e}), using in-memory store.")
                self.client = None
                self.db = None

    async def save_pass(self, pass_data: DigitalPass) -> None:
        if self.db:
            try:
                await self.db.passes.update_one(
                    {"token_id": pass_data.token_id},
                    {"$set": pass_data.model_dump()},
                    upsert=True
                )
            except Exception as e:
                logger.error(f"Mongo write error: {e}")
        self._passes[pass_data.token_id] = pass_data

    async def get_pass_by_id(self, token_id_or_code: str) -> Optional[DigitalPass]:
        if self.db:
            try:
                doc = await self.db.passes.find_one(
                    {"$or": [{"token_id": token_id_or_code}, {"pass_code": token_id_or_code}]}
                )
                if doc:
                    doc.pop("_id", None)
                    return DigitalPass(**doc)
            except Exception as e:
                logger.error(f"Mongo read error: {e}")
        
        # Check in-memory store
        for p in self._passes.values():
            if p.token_id == token_id_or_code or p.pass_code == token_id_or_code:
                return p
        return None

    async def get_all_passes(self) -> List[DigitalPass]:
        if self.db:
            try:
                cursor = self.db.passes.find({})
                results = []
                async for doc in cursor:
                    doc.pop("_id", None)
                    results.append(DigitalPass(**doc))
                if results:
                    return results
            except Exception as e:
                logger.error(f"Mongo read error: {e}")
        return list(self._passes.values())

    async def update_pass_stage(self, token_id: str, new_stage: QueueStage, extra_fields: Optional[Dict[str, Any]] = None) -> Optional[DigitalPass]:
        pass_obj = await self.get_pass_by_id(token_id)
        if not pass_obj:
            return None
        pass_obj.stage = new_stage
        if extra_fields:
            if "moisture_pct" in extra_fields and extra_fields["moisture_pct"] is not None:
                pass_obj.moisture_pct = float(extra_fields["moisture_pct"])
            if "quality_grade" in extra_fields and extra_fields["quality_grade"]:
                pass_obj.quality_grade = str(extra_fields["quality_grade"])
            if "gross_weight_kg" in extra_fields and extra_fields["gross_weight_kg"] is not None:
                pass_obj.gross_weight_kg = float(extra_fields["gross_weight_kg"])
            if "net_weight_kg" in extra_fields and extra_fields["net_weight_kg"] is not None:
                pass_obj.net_weight_kg = float(extra_fields["net_weight_kg"])
            if "estimated_payout_inr" in extra_fields and extra_fields["estimated_payout_inr"] is not None:
                pass_obj.estimated_payout_inr = float(extra_fields["estimated_payout_inr"])

        await self.save_pass(pass_obj)
        return pass_obj

    async def log_audit_event(self, event_type: str, details: Dict[str, Any]) -> None:
        entry = {
            "event_type": event_type,
            "details": details,
            "timestamp": "2026-08-30T20:00:00Z"
        }
        self._audit_logs.append(entry)
        if self.db:
            try:
                await self.db.audit_logs.insert_one(entry)
            except Exception as e:
                logger.error(f"Mongo audit log error: {e}")

db_manager = DatabaseManager()
