import { DialogAnimate } from '@root/src/components'
import { useCreateByAIMutation } from '@root/src/redux/services/manager/lessons-manager'
import { MANAGER_PATH_DASHBOARD } from '@root/src/routes/manager.paths'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'

import { Stack, TextField, Select, MenuItem, Button, InputLabel, FormControl, TextareaAutosize } from '@mui/material';

export function AiLessonCreateDialog({ open, closeTrigger }: { open: boolean, closeTrigger:()=>void }) {
  const [createByAi, { isLoading, isSuccess }] = useCreateByAIMutation()
  const router = useRouter()

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
    let data = new FormData(e.currentTarget)
    let newLesson = await createByAi({
      lessonDuration: data.get('lessonDuration') as string,
      proficiencyLevel: data.get('proficiencyLevel') as string,
      programmingLanguage: data.get('programmingLanguage') as string,
      track: data.get('track') as string,
      persona: data.get('persona') as string,
      lessonPrompt: data.get('lessonPrompt') as string,
    })
    if ('data' in newLesson && newLesson.data?.id) {
      router.push(
        MANAGER_PATH_DASHBOARD.lessons + '?' + new URLSearchParams({ lessonId: newLesson.data.id }),
        undefined,
        {
          shallow: true,
        }
      )
    }
  }
  if (!open) return <></>

  return (
    <DialogAnimate open={open}>
      {isLoading ? (
        <div>
          <img src='https://avatars.githubusercontent.com/u/19434091?v=4' />
          <div> Ai is preparing your lesson </div>
        </div>
      ) : (
<Stack spacing={2} sx={{ padding: '1rem' }}>
  <form onSubmit={(e) => onSubmit(e)}>
    {/* Lesson Duration */}
    <FormControl fullWidth>
      <InputLabel>Duration</InputLabel>
      <Select name="lessonDuration" defaultValue="">
        <MenuItem value="5 min">5 min</MenuItem>
        <MenuItem value="10 min">10 min</MenuItem>
        <MenuItem value="20 min">20 min</MenuItem>
        <MenuItem value="30 min">30 min</MenuItem>
      </Select>
    </FormControl>

    {/* Proficiency Level */}
    <FormControl fullWidth>
      <InputLabel>Proficiency Level</InputLabel>
      <Select name="proficiencyLevel" defaultValue="">
        <MenuItem value="beginner">Beginner</MenuItem>
        <MenuItem value="novice">Novice</MenuItem>
        <MenuItem value="amateur">Amateur</MenuItem>
        <MenuItem value="advanced">Advanced</MenuItem>
        <MenuItem value="senior">Senior</MenuItem>
      </Select>
    </FormControl>

    {/* Programming Language */}
    <FormControl fullWidth>
      <InputLabel>Programming Language</InputLabel>
      <Select name="programmingLanguage" defaultValue="">
        <MenuItem value="javascript">JavaScript</MenuItem>
        <MenuItem value="Html/Css">HTML/CSS</MenuItem>
        <MenuItem value="Kaboom.js">Kaboom.js</MenuItem>
      </Select>
    </FormControl>

    {/* Track */}
    <FormControl fullWidth>
      <InputLabel>Track</InputLabel>
      <Select name="track" defaultValue="">
        <MenuItem value="Api&AI">API & AI</MenuItem>
        <MenuItem value="Game-Dev">Game Development</MenuItem>
        <MenuItem value="Data Science">Data Science</MenuItem>
        <MenuItem value="Logic in Programming">Logic in Programming</MenuItem>
        <MenuItem value="Math class">Math Class</MenuItem>
        <MenuItem value="History class">History Class</MenuItem>
      </Select>
    </FormControl>

    {/* Persona */}
    <FormControl fullWidth>
      <InputLabel>Persona</InputLabel>
      <Select name="persona" defaultValue="">
        <MenuItem value="Winnie the Pooh">Winnie the Pooh</MenuItem>
        <MenuItem value="Buddah">Buddah</MenuItem>
        <MenuItem value="Pirate">Pirate</MenuItem>
        <MenuItem value="Garfield the cat">Garfield the Cat</MenuItem>
        <MenuItem value="Master Shifu">Master Shifu</MenuItem>
        <MenuItem value="Odin the God">Odin the God</MenuItem>
      </Select>
    </FormControl>

    {/* Lesson Prompt */}
    <TextareaAutosize
      minRows={5}
      name="lessonPrompt"
      defaultValue="Build me a simple to-do app from scratch lesson! By the end of this lesson, my students make a functional app where users can add, edit, and remove tasks"
      style={{ width: '100%', marginTop: '1rem' }}
    />

    {/* Submit Button */}
    <Button type="submit" variant="contained" color="primary" >
      Submit
                              </Button>
                              <Button  variant="contained" color="primary" onClick={closeTrigger} >
      Close
                              </Button>
                              
  </form>
</Stack>

      )}
        </DialogAnimate>
  )
}
