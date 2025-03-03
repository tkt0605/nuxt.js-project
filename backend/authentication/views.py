import random
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
import json
from django.conf import settings

def generate_otp():
    return str(random.randint(100000, 999999))

@csrf_exempt
def send_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        contact = data.get('contact')
        if not contact:
            return JsonResponse({"error": "メールアドレスを入力してください。"})
        otp = generate_otp()
        cache.set(contact, otp, timeout=300)
        if '@' in contact:
            send_mail(
                "あなたのOTP",
                f"以下があなたのワンタイムパスワードです。",
                f"{otp}",
                "takatokomada17@gmail.com",
                [contact],
                fail_silently=False,
            )
            return JsonResponse({"message": "OTPがメールに送信済み。"})
    return JsonResponse({"error": "無効なリクエスト"}, status = 400)
@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        contact = data.get('contact')
        otp = data.get('otp')
        if not contact or not otp:
            return JsonResponse({"error": "必要な情報が不足している。"}, status = 400)
        stored_otp = cache.get(contact)
        if stored_otp and stored_otp == otp:
            cache.delete(contact)
            return JsonResponse({'message': "認証成功"})
        return JsonResponse({"error": "OTPが間違っています。"}, status=400)
    return JsonResponse({"error": "無効なリクエスト"}, status=400)
