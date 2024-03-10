import json
from django.conf import settings
from django.http import HttpResponse
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse


@csrf_exempt
def llm(request):
    if request.method == 'POST':
        genai.configure(api_key="AIzaSyCUGnlIXYN1Ui-kZzXPS7S3ti4XKg7pJ_s")
        data = json.loads(request.body)
        input_text = data.get('message', '')
        generation_config = {
             "temperature": 0.9,
             "top_p": 1,
             "top_k": 1,
             "max_output_tokens": 2048,
           }

        safety_settings = [
          {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
        ]

        model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                      generation_config=generation_config,
                                      safety_settings=safety_settings)
        
        convo = model.start_chat(history=[
        ])
        inputt = f"I want to create a health assistant bot to answer user questions related to medical topics. If the user asks a medical question, provide the answer; otherwise, prompt as \"Hello, please ask medical related questions...\". User question is: {input_text}"
        convo.send_message(inputt)
        print(convo.last.text)

        convo.send_message(inputt)
        print(convo.last.text)
        input_text2 = f'''
        [
    "Addiction Medicine", "Anaesthetics", "Cardiology", "Cardiothoracic Surgery", "Clinical Genetics",
    "Dental Surgery", "Dentistry", "Dermatology", "Diagnostic Radiology", "Endocrinology",
    "Gastroenterology and Hepatology", "General Medicine", "General Practice (GP)", "General Surgery",
    "Geriatric Medicine", "Haematology", "Immunology and Allergy", "Infectious Diseases", "Intensive Care",
    "Internal Medicine", "Nephrology", "Neurology", "Neurosurgery", "Nuclear Medicine",
    "Obstetrics and Gynaecology", "Occupational and Environmental Medicine", "Oncology", "Ophthalmology",
    "Orthopaedic Surgery", "Otolaryngology (ENT) - Head and Neck Surgery", "Paediatric Medicine",
    "Paediatric Surgery", "Palliative Medicine", "Pathology", "Plastic and Reconstructive Surgery",
    "Psychiatry", "Rehabilitation Medicine", "Respiratory and Sleep Medicine", "Rheumatology",
    "Sexual Health Medicine", "Sport and Exercise Medicine", "Urology", "Vascular Surgery","general practitioner"
] 

{input_text} - this is the user input, suggest any specialization from above the list. and output should only contains specialization


'''
        
        
        # messages2 = []
        # messages2.append(input_text2)
        # response2 = palm.chat(
        #   **defaults,
        #   context=context,
        #   examples=examples,
        #   messages=messages2
        # ) 



        #  print(response.last) # Response of the AI to your most recent request
        # print(generated_code)
        return JsonResponse({'data':  convo.last.text })
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)



def getdoctors():
      client = MongoClient(settings.MONGO_URL)
      db = client['DoctorBooking']
      collection = db['Doctors']

      specializations = [
    "Addiction Medicine",
    "Anaesthetics",
    "Cardiology",
    "Cardiothoracic Surgery",
    "Clinical Genetics",
    "Dental Surgery",
    "Dentistry",
    "Dermatology",
    "Diagnostic Radiology",
    "Endocrinology",
    "Gastroenterology and Hepatology",
    "General Medicine",
    "General Practice (GP)",
    "General Surgery",
    "Geriatric Medicine",
    "Haematology",
    "Immunology and Allergy",
    "Infectious Diseases",
    "Intensive Care",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Neurosurgery",
    "Nuclear Medicine",
    "Obstetrics and Gynaecology",
    "Occupational and Environmental Medicine",
    "Oncology",
    "Ophthalmology",
    "Orthopaedic Surgery",
    "Otolaryngology (ENT) - Head and Neck Surgery",
    "Paediatric Medicine",
    "Paediatric Surgery",
    "Palliative Medicine",
    "Pathology",
    "Plastic and Reconstructive Surgery",
    "Psychiatry",
    "Rehabilitation Medicine",
    "Respiratory and Sleep Medicine",
    "Rheumatology",
    "Sexual Health Medicine",
    "Sport and Exercise Medicine",
    "Urology",
    "Vascular Surgery"
    ]
      
      projection = {'name': 1, 'specialization': 1, 'contactNumber': 1, '_id': 0}

        # Convert the cursor data to a list of dictionaries with the specified fields
      doctors_list = list(collection.find({}, projection))

      return doctors_list , specializations