import { useState } from 'react'
import Joyride from 'react-joyride'

export default function AuthTour({ steps }) {
  const [run, setRun] = useState(true)

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      styles={{
        options: {
          primaryColor: '#0284c7',
          zIndex: 10000,
        },
      }}
      callback={(data) => {
        const { status } = data
        if (status === 'finished' || status === 'skipped') {
          setRun(false)
        }
      }}
    />
  )
}
