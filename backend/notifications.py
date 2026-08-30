import os
import logging
from typing import Dict, Any, Optional, List
from models import DigitalPass, CropType

logger = logging.getLogger(__name__)

# Multilingual Templates for SMS & WhatsApp Dispatch
TEMPLATES = {
    "en": {
        "booking_confirmed": "🌾 [KrishiFlow] Slot Confirmed! Token: {pass_code}. Crop: {crop} ({qty} Qtl). Your slot: {slot_start} at {bay_name}, {hub_name}. Suggested departure: {departure}. Show your pass: {pass_url}",
        "delay_alert": "⚠️ [KrishiFlow Alert] Due to dock maintenance, your slot is shifted to {slot_start}. Assigned Bay: {bay_name}. Please proceed accordingly.",
        "gate_call": "🚜 [KrishiFlow Gate Call] Token {pass_code}: Bay {bay_name} is ready for unloading! Please proceed to Gate 1 Weighbridge now.",
        "payment_done": "✅ [KrishiFlow DBT] Delivery completed! Net Wt: {net_wt} kg. Quality: {grade}. Direct Benefit Transfer of ₹{amount:,.2f} initiated to your bank account."
    },
    "hi": {
        "booking_confirmed": "🌾 [कृषि-फ्लो] स्लॉट कन्फर्म! टोकन: {pass_code}। फसल: {crop} ({qty} क्विंटल)। आगमन समय: {slot_start}, {bay_name}, {hub_name}। खेत से निकलने का समय: {departure}। पास देखें: {pass_url}",
        "delay_alert": "⚠️ [कृषि-फ्लो सूचना] तकनीकी सुधार के कारण आपका स्लॉट समय बदलकर {slot_start} ({bay_name}) किया गया है। कृपया समय पर पहुंचें।",
        "gate_call": "🚜 [कृषि-फ्लो बुलावा] टोकन {pass_code}: अनलोडिंग बे {bay_name} तैयार है! कृपया वे-ब्रिज 1 पर आएं।",
        "payment_done": "✅ [कृषि-फ्लो भुगतान] डिलीवरी सफल! कुल वजन: {net_wt} किग्रा, ग्रेड: {grade}। ₹{amount:,.2f} की डीबीटी राशि आपके बैंक खाते में भेजी गई।"
    },
    "te": {
        "booking_confirmed": "🌾 [కృషి-ఫ్లో] స్లాట్ ఖరారైంది! టోకెన్: {pass_code}. పంట: {crop} ({qty} క్విం.). రాక సమయం: {slot_start}, {bay_name}. బయలుదేరాల్సిన సమయం: {departure}.",
        "delay_alert": "⚠️ [కృషి-ఫ్లో అలర్ట్] డాక్ రీ-షెడ్యూల్ కారణంగా మీ స్లాట్ సమయం {slot_start} ({bay_name}) కి మార్చబడింది.",
        "gate_call": "🚜 [కృషి-ఫ్లో పిలుపు] టోకెన్ {pass_code}: బే {bay_name} సిద్ధంగా ఉంది! దయచేసి వేబ్రిడ్జి వద్దకు రండి.",
        "payment_done": "✅ [కృషి-ఫ్లో చెల్లింపు] రవాణా పూర్తయింది! నికర బరువు: {net_wt} కేజీలు. ₹{amount:,.2f} మీ ఖాతాలో జమ చేయబడింది."
    },
    "mr": {
        "booking_confirmed": "🌾 [कृषी-फ्लो] स्लॉट निश्चित! टोकन: {pass_code}. पीक: {crop} ({qty} क्विंटल). आगमन वेळ: {slot_start}, {bay_name}, {hub_name}. प्रवासाची वेळ: {departure}.",
        "delay_alert": "⚠️ [कृषी-फ्लो अलर्ट] देखभालीमुळे आपला स्लॉट {slot_start} ({bay_name}) असा बदलण्यात आला आहे.",
        "gate_call": "🚜 [कृषी-फ्लो कॉल] टोकन {pass_code}: बे {bay_name} रिकामी झाली आहे! कृपया वे-ब्रिजवर या.",
        "payment_done": "✅ [कृषी-फ्लो पावती] माल जमा झाला! निव्वळ वजन: {net_wt} किलो. ₹{amount:,.2f} थेट आपल्या बँक खात्यात जमा केले."
    },
    "pa": {
        "booking_confirmed": "🌾 [ਕ੍ਰਿਸ਼ੀ-ਫਲੋ] ਸਲਾਟ ਕਨਫਰਮ! ਟੋਕਨ: {pass_code}। ਫਸਲ: {crop} ({qty} ਕੁਇੰਟਲ)। ਸਮਾਂ: {slot_start}, {bay_name}। ਰਵਾਨਗੀ ਸਮਾਂ: {departure}।",
        "delay_alert": "⚠️ [ਕ੍ਰਿਸ਼ੀ-ਫਲੋ ਸੂਚਨਾ] ਤੁਹਾਡਾ ਸਲਾਟ ਬਦਲ ਕੇ {slot_start} ({bay_name}) ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ।",
        "gate_call": "🚜 [ਕ੍ਰਿਸ਼ੀ-ਫਲੋ ਬੁਲਾਵਾ] ਟੋਕਨ {pass_code}: ਬੇਅ {bay_name} ਖਾਲੀ ਹੈ! ਕਿਰਪਾ ਕਰਕੇ ਕੰਡੇ 'ਤੇ ਆਓ।",
        "payment_done": "✅ [ਕ੍ਰਿਸ਼ੀ-ਫਲੋ ਭੁਗਤਾਨ] ਫਸਲ ਸਵੀਕਾਰ! ਨੈੱਟ ਵਜ਼ਨ: {net_wt} ਕਿਲੋ। ₹{amount:,.2f} ਤੁਹਾਡੇ ਖਾਤੇ ਵਿੱਚ ਭੇਜ ਦਿੱਤੇ ਗਏ ਹਨ।"
    }
}

class NotificationDispatcher:
    """
    Handles automated WhatsApp Cloud API and Twilio SMS dispatching,
    with an interactive simulation log for live demonstration.
    """
    def __init__(self):
        self.twilio_account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.twilio_auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.twilio_from_number = os.getenv("TWILIO_FROM_NUMBER", "+1234567890")
        self.whatsapp_token = os.getenv("WHATSAPP_TOKEN")
        self.whatsapp_phone_number_id = os.getenv("WHATSAPP_PHONE_NUMBER_ID")

        # In-memory notification dispatch log for live simulator UI
        self.dispatch_log: List[Dict[str, Any]] = []

    def _render_message(self, template_key: str, lang: str, **kwargs) -> str:
        lang_dict = TEMPLATES.get(lang, TEMPLATES["en"])
        tmpl = lang_dict.get(template_key, TEMPLATES["en"][template_key])
        return tmpl.format(**kwargs)

    async def send_slot_confirmation(self, pass_obj: DigitalPass, lang: str = "en") -> Dict[str, Any]:
        msg_text = self._render_message(
            "booking_confirmed",
            lang,
            pass_code=pass_obj.pass_code,
            crop=pass_obj.crop,
            qty=pass_obj.quantity_quintals,
            slot_start=pass_obj.scheduled_slot_start,
            bay_name=pass_obj.assigned_bay_name,
            hub_name=pass_obj.hub_name,
            departure=pass_obj.suggested_departure_time,
            pass_url=f"https://krishiflow.app/pass/{pass_obj.token_id}"
        )

        entry = {
            "id": f"MSG-{len(self.dispatch_log) + 1:04d}",
            "channel": "WhatsApp / SMS",
            "recipient_phone": pass_obj.phone,
            "recipient_name": pass_obj.farmer_name,
            "language": lang.upper(),
            "message": msg_text,
            "status": "DELIVERED",
            "timestamp": "Just now",
            "type": "SLOT_CONFIRMATION"
        }
        self.dispatch_log.insert(0, entry)
        return entry

    async def send_gate_call(self, pass_obj: DigitalPass, lang: str = "en") -> Dict[str, Any]:
        msg_text = self._render_message(
            "gate_call",
            lang,
            pass_code=pass_obj.pass_code,
            bay_name=pass_obj.assigned_bay_name
        )
        entry = {
            "id": f"MSG-{len(self.dispatch_log) + 1:04d}",
            "channel": "WhatsApp / SMS",
            "recipient_phone": pass_obj.phone,
            "recipient_name": pass_obj.farmer_name,
            "language": lang.upper(),
            "message": msg_text,
            "status": "DELIVERED",
            "timestamp": "Just now",
            "type": "GATE_CALL"
        }
        self.dispatch_log.insert(0, entry)
        return entry

    async def send_payment_receipt(self, pass_obj: DigitalPass, lang: str = "en") -> Dict[str, Any]:
        msg_text = self._render_message(
            "payment_done",
            lang,
            net_wt=pass_obj.net_weight_kg or (pass_obj.quantity_quintals * 100),
            grade=pass_obj.quality_grade or "Grade A",
            amount=pass_obj.estimated_payout_inr
        )
        entry = {
            "id": f"MSG-{len(self.dispatch_log) + 1:04d}",
            "channel": "WhatsApp / SMS",
            "recipient_phone": pass_obj.phone,
            "recipient_name": pass_obj.farmer_name,
            "language": lang.upper(),
            "message": msg_text,
            "status": "DELIVERED",
            "timestamp": "Just now",
            "type": "PAYMENT_RECEIPT"
        }
        self.dispatch_log.insert(0, entry)
        return entry

    def parse_inbound_sms(self, sender_phone: str, body_text: str) -> Dict[str, Any]:
        """
        Parses two-way SMS commands from feature phones.
        Commands supported:
        - 'BOOK <CROP> <QTY> <VILLAGE>' e.g. 'BOOK TOMATO 40 SANWER'
        - 'STATUS <PASS_CODE>' e.g. 'STATUS KRISHI-1001'
        - 'DELAY <MINUTES>' e.g. 'DELAY 30'
        - 'HELP'
        """
        clean_text = body_text.strip().upper()
        parts = clean_text.split()

        if not parts:
            return {"action": "HELP", "message": "KrishiFlow SMS Service: Send 'BOOK <CROP> <QTY> <VILLAGE>' or 'STATUS <TOKEN>'"}

        command = parts[0]

        if command == "BOOK":
            # Expected: BOOK TOMATO 40 SANWER
            crop_name = parts[1] if len(parts) > 1 else "WHEAT"
            qty = float(parts[2]) if len(parts) > 2 and parts[2].replace('.', '', 1).isdigit() else 50.0
            village = parts[3] if len(parts) > 3 else "Indore Rural"
            return {
                "action": "BOOK",
                "phone": sender_phone,
                "crop": crop_name,
                "quantity": qty,
                "village": village
            }
        elif command == "STATUS":
            token_code = parts[1] if len(parts) > 1 else ""
            return {
                "action": "STATUS",
                "phone": sender_phone,
                "token_code": token_code
            }
        elif command == "DELAY":
            mins = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 30
            return {
                "action": "DELAY",
                "phone": sender_phone,
                "minutes": mins
            }
        else:
            return {
                "action": "HELP",
                "message": "Commands: 1) BOOK <CROP> <QTY> <VILLAGE>, 2) STATUS <TOKEN>, 3) DELAY <MINS>"
            }

notification_dispatcher = NotificationDispatcher()
