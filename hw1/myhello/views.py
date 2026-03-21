from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import logging

# 這裡只引入我們剛建立的 Course_table
from .models import Course_table

logger = logging.getLogger('django')

# 1. 回傳課程列表的 API (對應 127.0.0.1:8000/courselist)
@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return JsonResponse(list(courses), safe=False)

# 2. 加入課程的 API (對應 127.0.0.1:8000/addcourse)
@api_view(['GET'])
def addcourse(request):
    # 從網址列取得三個欄位的參數
    department = request.GET.get('Department', '')
    course_title = request.GET.get('CourseTitle', '')
    instructor = request.GET.get('Instructor', '')
    
    # 確保三個欄位都有填寫才存入資料庫
    if department and course_title and instructor:
        new_course = Course_table()
        new_course.Department = department
        new_course.CourseTitle = course_title
        new_course.Instructor = instructor
        new_course.save()
        
        logger.debug(f"**** Added Course: {course_title}")
        return Response({"data": f"{course_title} insert success!"}, status=status.HTTP_200_OK)
    else:
        return Response({"res": "parameter: missing data"}, status=status.HTTP_400_BAD_REQUEST)