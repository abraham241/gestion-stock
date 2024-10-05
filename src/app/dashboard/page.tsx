import React from 'react'
import Section from './_components/section'

const page = () => {
  return (
    <main className='flex w-full flex-1 gap-x-5 h-full'>
      <div className='w-[70%] h-full flex flex-col gap-y-3 flex-none'>
        <div className='h-[50%] w-full flex-none grid grid-cols-2 gap-5'>
          <Section className='bg-white flex-none h-full w-full'>
            <h1></h1>
          </Section>
          <Section className='bg-white flex-none h-full w-full'>
            <h1></h1>
          </Section>
          <Section className='bg-white flex-none h-full w-full'>
            <h1></h1>
          </Section>
          <Section className='bg-white flex-none h-full w-full'>
            <h1></h1>
          </Section>
        </div>
        <Section className='h-[50%] w-full bg-white flex-none'>
          <h1></h1>
        </Section>
      </div>
      <div className='w-[28%] h-full flex flex-col gap-y-3 flex-none'>
        <Section className='h-[60%] w-full bg-white flex-none'>
          <h1></h1>
        </Section>
        <Section className='h-[40%] w-full bg-white flex-none'>
          <h1></h1>
        </Section>
      </div>
    </main>
  )
}

export default page