import { FormEvent, useState } from 'react'

import {
  Stack,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from '@mui/material'
import { useRouter } from 'next/router'

import { DialogAnimate } from '@root/src/components'
import { useCreateLessonContentMutation } from '@root/src/redux/services/manager/lesson-content-manager'
import {
  useAskAIMutation,
  useCreateByCloningLessonMutation,
} from '@root/src/redux/services/manager/lessons-manager'
import { MANAGER_PATH_DASHBOARD } from '@root/src/routes/manager.paths'

export function AiLessonCreateDialogFe({
  open,
  closeTrigger,
}: {
  open: boolean
  closeTrigger: () => void
}) {
  const [askAI, { isLoading, isSuccess }] = useAskAIMutation()
  const [createByCloningLesson, { isLoading: isLessonCreationLoading }] =
    useCreateByCloningLessonMutation()
  const [createLessonContent] = useCreateLessonContentMutation()
  const [aiThinking, aiThinkingSet] = useState(false)

  const router = useRouter()
  async function createLesson(contents: any[]) {
    let newlesson = await createByCloningLesson()
    if ('data' in newlesson) {
      let lessonId = newlesson.data.id
      contents.map((content) => createLessonContent({ lessonId, ...content }))
      Promise.allSettled(contents).then(() => {
        aiThinkingSet(false)
        router.push(
          MANAGER_PATH_DASHBOARD.lessons.root + '?' + new URLSearchParams({ lessonId }),
          undefined,
          {
            shallow: true,
          }
        )
      })
    } //@todo else error
  }
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let formdata = ''

    new FormData(e.currentTarget).forEach((v, k) => (formdata += '\n' + `${k} = ${v} `))
    aiThinkingSet(true)
    let response = await askAI({
      prompt: `
            make an lesson with those properties : 
            ${formdata}

        output format = [{
            body: Json string of {content: small work for student to solve } // description what will student do 
            tips: string            // for mini help
            solution_body: string   // solution        
            title: string           // part title
            description: string     // short desc for teacher to remember
            active: boolean;
            bg_color: string;
            complexity: string;     // beginer etc
            preload_body: string;   //
            slug: string;
            tags: string[];
            type: string;           //this is only value = 'code'
            meta:{order:number};    // order of parts
       
            }]
        example =[{
                body:"{\"content\":\"<div><h2>CHALLENGE</h2><p class=\\\"fs75 black\\\">STEP 1 OF 2</p></div><div class=\\\"my-auto\\\"><p class=\\\"h1 black text-left desktop-only sfirstslide\\\">Hi,... </p><p class=\\\"h1 black text-left mobile-only\\\">Hi,... <img class=\\\"swiper-lazy\\\" src=\\\"/img/emoji/72/waving-hand-sign-type-3.png\\\" alt=\\\"\\\"></p><div class=\\\"h2 black text-left desktop-only sfirstslide\\\"><p>Type <span class=\\\"inline-code bg-black p-2\\\">&lt;h1&gt;</span> in the code editor on the right.</p></div><div class=\\\"h2 black text-left mobile-only\\\"><p>Type <span class=\\\"inline-code bg-black p-2\\\">&lt;h1&gt;</span> in the code editor.</p></div><div class=\\\"button-locked\\\"><a class=\\\"btn-action swiper-editor mobile-only\\\">Let's get Coding&nbsp;</a>&nbsp;<br><a class=\\\"swiper-next skip\\\">Skip this step</a></div><div class=\\\"button-unlocked\\\"><a class=\\\"btn-success swiper-next\\\">I did it</a></div></div>\"}",
                tips:"There are no spaces between all the characters.",
                solution_body:"<span class="green-solution">&lt;h1&gt;</span>",
                title: "first step"           // part title
                description: "intro to editor",     // short desc for teacher to remember
                active: true;
                complexity: "beginer";    
                preload_body: "";   //
                slug: string;
                tags: "";
                type: "code";          
                meta:{order:1};
            }]
        our editor has 3 parts: 
        * body : explanations,
        * codeeditor: student enters
        * viewer: students sees results
        
        No need explanations, return only json.
        `,
    })
    if ('error' in response) {
      // error means we cant parse openai response since it starts with formatting= ```
      if ('data' in response.error) {
        let data = response.error.data as string
        let newLesson = JSON.parse(data.slice(7, -3))
        createLesson(newLesson)
      }
    } //@todo handle lesson didnt create case
  }
  if (!open) return <></>

  return (
    <>
      <DialogAnimate open={open}>
        {isLoading || aiThinking ? (
          <div>
            <img src='https://avatars.githubusercontent.com/u/19434091?v=4' />
            <div> {isLoading ? 'Ai is preparing your lesson' : 'Saving prepared lesson'} </div>
          </div>
        ) : (
          <Stack
            spacing={2}
            sx={{ padding: '1rem' }}
          >
            <h1>Create Lesson by AI</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              {/* Lesson Duration */}
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  name='lessonDuration'
                  defaultValue=''
                >
                  <MenuItem value='3 slides'>5 min</MenuItem>
                  <MenuItem value='6 slides'>10 min</MenuItem>
                  <MenuItem value='2 slides'>2 min</MenuItem>
                  <MenuItem value='10 min'>30 min</MenuItem>
                </Select>
              </FormControl>

              {/* Proficiency Level */}
              <FormControl fullWidth>
                <InputLabel>Proficiency Level</InputLabel>
                <Select
                  name='proficiencyLevel'
                  defaultValue=''
                >
                  <MenuItem value='beginner'>Beginner</MenuItem>
                  <MenuItem value='novice'>Novice</MenuItem>
                  <MenuItem value='amateur'>Amateur</MenuItem>
                  <MenuItem value='advanced'>Advanced</MenuItem>
                  <MenuItem value='senior'>Senior</MenuItem>
                </Select>
              </FormControl>

              {/* Programming Language */}
              <FormControl fullWidth>
                <InputLabel>Programming Language</InputLabel>
                <Select
                  name='programmingLanguage'
                  defaultValue=''
                >
                  <MenuItem value='javascript'>JavaScript</MenuItem>
                  <MenuItem value='Html/Css'>HTML/CSS</MenuItem>
                  <MenuItem value='Kaboom.js'>Kaboom.js</MenuItem>
                </Select>
              </FormControl>

              {/* Track */}
              <FormControl fullWidth>
                <InputLabel>Track</InputLabel>
                <Select
                  name='track'
                  defaultValue=''
                >
                  <MenuItem value='Api&AI'>API & AI</MenuItem>
                  <MenuItem value='Game-Dev'>Game Development</MenuItem>
                  <MenuItem value='Data Science'>Data Science</MenuItem>
                  <MenuItem value='Logic in Programming'>Logic in Programming</MenuItem>
                  <MenuItem value='Math class'>Math Class</MenuItem>
                  <MenuItem value='History class'>History Class</MenuItem>
                </Select>
              </FormControl>

              {/* Persona */}
              <FormControl fullWidth>
                <InputLabel>Persona</InputLabel>
                <Select
                  name='persona'
                  defaultValue=''
                >
                  <MenuItem value='Winnie the Pooh'>Winnie the Pooh</MenuItem>
                  <MenuItem value='Buddah'>Buddah</MenuItem>
                  <MenuItem value='Pirate'>Pirate</MenuItem>
                  <MenuItem value='Garfield the cat'>Garfield the Cat</MenuItem>
                  <MenuItem value='Master Shifu'>Master Shifu</MenuItem>
                  <MenuItem value='Odin the God'>Odin the God</MenuItem>
                </Select>
              </FormControl>

              {/* Lesson Prompt */}
              <TextareaAutosize
                minRows={5}
                name='lessonPrompt'
                defaultValue='Build me a simple to-do app from scratch lesson! By the end of this lesson, my students make a functional app where users can add, edit, and remove tasks'
                style={{ width: '100%', marginTop: '1rem' }}
              />

              {/* Submit Button */}
              <Button
                type='submit'
                variant='contained'
                color='primary'
              >
                Submit
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={closeTrigger}
              >
                Close
              </Button>
            </form>
          </Stack>
        )}
      </DialogAnimate>
    </>
  )
}
