import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

export default function UserHome() {
  return (
    <div className=" w-full h-screen bg-slate-200">
      <div className='bg-gray-400  h-full'>
        <div className='w-full flex flex-col items-center '>
          <Alert icon={false} className='w-5/6  flex flex-row justify-center my-32 bg-[rgb(237, 247, 237)] md:w-3/4 lg:w-2/3' >
            <Typography variant="h4" color="info" >
              My Profile
            </Typography>
          </Alert>
        </div>
      </div>
    </div>
  )
}
