import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/ui/kit/card';

function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <main className='grow flex flex-col pt-[200px] items-center'>
      <Card className='w-full max-w-[600px]'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-sm text-muted-forground'>{footerText}</p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default AuthLayout;
