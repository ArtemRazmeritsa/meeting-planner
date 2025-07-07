import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';

function StepsLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <main className='flex flex-col pt-[40px] sm:pt-[80px] items-center w-full'>
      <Card className='w-[80%] md:w-[60%] p-6'>
        <CardHeader className='flex justify-center whitespace-nowrap'>
          <CardTitle className='text-xl'>{title}</CardTitle>
        </CardHeader>
        <CardContent className='flex justify-center'>{children}</CardContent>
      </Card>
    </main>
  );
}

export default StepsLayout;
