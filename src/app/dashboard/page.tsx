import React from 'react'
import Section from './_components/section';
import { Badge } from "@/components/ui/badge"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { AiOutlineProduct } from "react-icons/ai";
import { Chart } from './_components/chart';

const page = () => {
  return (
    <main className='flex w-full gap-x-5 h-[100vh] flex-none'>
      <div className='w-[70%] h-full flex flex-col justify-between gap-y-10'>
        <div className='w-full flex flex-col gap-y-3'>
          <div className='flex justify-between w-full'>
            <Section className='bg-white flex-none p-4 w-[47%] flex flex-col gap-y-2 justify-between'>
              <div className='flex justify-between items-center'>
                <div className='bg-[#f8f8f8] p-3 rounded-2xl'>
                  <LiaFileInvoiceDollarSolid size={25} />
                </div>
                <Badge className='bg-[#78f080] p-1'>
                  +2,06%
                </Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <span>
                  Total du Mois
                </span>
                <div className='text-3xl font-bold'>
                  275900 FCFA
                </div>
              </div>
            </Section>
            <Section className='bg-white flex-none p-4 w-[47%] gap-y-2  flex flex-col justify-between'>
              <div className='flex justify-between items-center'>
                <div className='bg-[#f8f8f8] p-3 rounded-2xl'>
                  <LiaFileInvoiceDollarSolid size={25} />
                </div>
                <Badge className='bg-[#78f080] p-1'>
                  +12,06%
                </Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <span>
                  Total de la Semaine
                </span>
                <div className='text-3xl font-bold'>
                  100900 FCFA
                </div>
              </div>
            </Section>
          </div>
          <div className='flex justify-between w-full'>
            <Section className='bg-white flex-none p-4 w-[47%] gap-y-2  flex flex-col justify-between'>
              <div className='flex justify-between items-center'>
                <div className='bg-[#f8f8f8] p-3 rounded-2xl'>
                  <AiOutlineProduct size={25} />
                </div>
                <Badge className='bg-[#78f080] p-1'>
                  +2,06%
                </Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <span>
                  Total d'article vendu dans le mois
                </span>
                <div className='font-bold'>
                  <span className='text-3xl'>
                    80
                  </span>
                  <span>
                    Articles
                  </span>
                </div>
              </div>
            </Section>
            <Section className='bg-white flex-none p-4 w-[47%] gap-y-2 flex flex-col justify-between'>
              <div className='flex justify-between items-center'>
                <div className='bg-[#f8f8f8] p-3 rounded-2xl'>
                  <AiOutlineProduct size={25} />
                </div>
                <Badge className='bg-[#78f080] p-1'>
                  +2,06%
                </Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <span>
                  Total d'article vendu de la semaine
                </span>
                <div className='font-bold'>
                  <span className='text-3xl'>
                    30
                  </span>
                  <span>
                    Articles
                  </span>
                </div>
              </div>
            </Section>
          </div>
        </div>
        <div className='h-[47%] w-full bg-white flex-none rounded-lg border'>
          <Chart/>
        </div>
      </div>
      <div className='w-[28%] h-full flex flex-col justify-between'>
        <Section className='h-[58%] w-full bg-white flex-none p-2'>
          <h1 className='text-xl font-bold'>
            Produit recement vendu
          </h1>
        </Section>
        <Section className='h-[40%] w-full bg-white flex-none'>
          <h1></h1>
        </Section>
      </div>
    </main>
  )
}

export default page