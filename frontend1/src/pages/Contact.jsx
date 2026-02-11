


import { assets } from '../assets/frontend_assets/assets'

function Contact() {
  return (
    <div>
      <h1 className='text-center mt-4 mb-8 font-semibold'>CONTACT US</h1>
      
      <div className='md:flex justify-center gap-8'>
        <img className="w-80 h-90"src={assets.contact_image} alt="" />

        <div className='flex flex-col gap-5'>
          <h1 className='font-semibold'>Our OFFICE</h1>
          <p>54709 Willms Station <br />
            Suite 350, Washington, USA</p>
          
          <p>Tel: (415) 555‑0132</p>
          <p>wakTechs@gmail.com</p>


        <h1 className='font-semibold'>CAREERS AT WAKCARE</h1>

          <p>Learn more about our teams and job openings.</p>

          <button className='border border-black-400 w-30 py-2 px-1.5'>Explore Jobs</button>



        </div>
      </div>

      
    </div>
  )
}

export default Contact