import React from 'react'
import { UserButton, auth } from '@clerk/nextjs'
import MainNav from './MainNav'
import StoreDropdown from './StoreDropdown'
import { redirect } from 'next/navigation'
import prisma from '@/prisma/client'


const Navbar = async () => {
    const {userId} = auth()
    if(!userId) {redirect('/sign-in')}
    const stores = await prisma.store.findMany({
        where:{
            userId:userId
        }
    })
  return (
   <>
   <div className='flex h-16 px-4 justify-between items-center border-b'>
    <div className='flex space-x-4 items-center  '>
        <div>
            <StoreDropdown items={stores}/>
        </div>
        <div className=''>
            <MainNav/>
        </div>

    </div>
    <div>
        <UserButton afterSignOutUrl='/'/>
    </div>
   </div>
   </>
  )
}

export default Navbar