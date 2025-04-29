/**
 * runs after login/ logout
 */

import { useEffect } from "react";
import { RootState, useSelector } from "../redux/store";
import { progressGuestClearAll, progressGuestGetAllLessons, progressGuestSet } from "../utils/progressLocalStorage";
import { useUpdateStudentLastVisitedSlideMutation } from "../redux/services/manager/lesson-student";
import { useCompleteLessonMutation } from "../redux/services/manager/progress-student";



export function useLogin(){
  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const [completeLesson] = useCompleteLessonMutation()
  const user = useSelector((state: RootState) => state.global.user);
  useEffect(()=>{
    if(user){
      runAfterLogin()
    }
  }, [user])
  

  const runAfterLogin = ()=>{
    let lessons = progressGuestGetAllLessons();
    lessons.forEach(lesson => {
      updateLastVisitedSlide({
        lessonId: lesson.lessonId, 
        slideNumber: lesson.lastSlide
      })
      lesson.challanges.forEach(c=>{
        if(!c?.processed){
        completeLesson({
          lesson_content_id: c.slideId,
          id:c.courseId,
          module_id:c.moduleId,
          code:''
        })
        c.processed = true;
      }
      })

    });
    progressGuestClearAll()

    

  }



}