
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import redirect
import google.generativeai as palm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from pymongo import MongoClient
from django.http import JsonResponse


@csrf_exempt
def firstpage(request):

    if request.method == 'POST':
        palm.configure(api_key="AIzaSyCUGnlIXYN1Ui-kZzXPS7S3ti4XKg7pJ_s")
        input_text = request.POST.get('inputText', '')
      

        defaults = {
          'model': 'models/chat-bison-001',
          'temperature': 0.25,
          'candidate_count': 1,
          'top_k': 40,
          'top_p': 0.95,
        }
        context = ""
        examples = [
          [
            "hello  ",
            "Hello! How can I help you today?"
          ],
          [
            "i feel blood sugar level is increased what i have to do?",
            "If you feel your blood sugar level is increased, you should first check your blood sugar level with a blood glucose meter. If your blood sugar level is above 200 milligrams per deciliter (mg/dL), you should seek medical attention immediately. You can also try to lower your blood sugar level by eating a healthy meal, drinking plenty of fluids, and taking your prescribed medications. If you have diabetes, it is important to monitor your blood sugar level regularly and to follow your doctor's treatment plan.\r\n\r\nHere are some tips to help you lower your blood sugar level:\r\n\r\n* Eat a healthy diet. A healthy diet is important for everyone, but it is especially important for people with diabetes. A healthy diet includes plenty of fruits, vegetables, and whole grains. It is also important to limit your intake of unhealthy fats, sugar, and salt.\r\n* Exercise regularly. Exercise helps to lower blood sugar levels and improve overall health. Aim for at least 30 minutes of moderate-intensity exercise most days of the week.\r\n* Take your medications as prescribed. If you have been prescribed medication for diabetes, it is important to take it as prescribed. Do not stop taking your medication without talking to your doctor.\r\n* Monitor your blood sugar level. It is important to monitor your blood sugar level regularly. This will help you to see how your diet, exercise, and medications are affecting your blood sugar level.\r\n* Get regular checkups. It is important to see your doctor for regular checkups. Your doctor can monitor your blood sugar level, check for complications of diabetes, and make sure that you are taking care of yourself.\r\n\r\nIf you have any questions or concerns about your blood sugar level, please talk to your doctor."
          ]
        ]
        messages = []
        messages.append(input_text)
        response = palm.chat(
          **defaults,
          context=context,
          examples=examples,
          messages=messages
        )
        #  print(response.last) # Response of the AI to your most recent request
        # print(generated_code)
        return JsonResponse({'responseText': response.last })

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)






