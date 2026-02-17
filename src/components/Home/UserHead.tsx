import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export default function UserHead() {
  return (
    <>
      <div className='w-full flex flex-col items-center px-5'>
        <Alert icon={false} className='w-full   flex flex-row justify-center mt-32 bg-[rgb(237, 247, 237)] md:w-3/4 lg:w-2/3' >
          <Typography variant="h4" color="info" >
            My Profile
          </Typography>
        </Alert>
      </div>
    </>
  )
}
