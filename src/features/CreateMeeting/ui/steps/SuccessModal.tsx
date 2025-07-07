import { Button } from '@/shared/ui/kit/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogOverlay,
} from '@/shared/ui/kit/dialog';
import { ClipboardCopy, ExternalLink, Send, Share2 } from 'lucide-react';
import { toast } from 'sonner';

type ModalProps = {
  link: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onGoToMeetings: () => void;
};
export function SuccessModal({
  isOpen,
  link,
  setIsOpen,
  onGoToMeetings,
}: ModalProps) {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast('Ссылка скопирована!', { duration: 2000 });
    } catch (err) {
      toast(`Ошибка копирования: ${err}`);
    }
  };
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(link)}`;
  const telegramShare = `https://t.me/share/url?url=${encodeURIComponent(
    link,
  )}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className='bg-gradient-to-br from-black/40 via-black/10 to-transparent backdrop-blur-xs' />
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className='top-110 flex flex-col py-10 items-center justify-between h-[350px]'
      >
        <DialogTitle>🎉 Встреча успешно создана!</DialogTitle>

        <div className='flex flex-col gap-6 p-3 border-1 rounded-2xl w-full'>
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className=' text-sm rounded-sm p-1 font-medium hover:underline break-all inline-flex justify-center gap-1'
          >
            {link} <ExternalLink className='w-4 h-4' />
          </a>

          <div className='flex justify-between gap-1 flex-wrap w-full'>
            <Button
              variant='outline'
              className='w-full sm:w-auto'
              onClick={handleCopy}
            >
              <ClipboardCopy className='h-4 mr-1' /> Скопировать
            </Button>

            <a
              href={whatsappShare}
              target='_blank'
              rel='noopener noreferrer'
              className='w-[48%] sm:w-auto'
            >
              <Button variant='outline' className='w-full sm:w-auto'>
                <Share2 className='h-4 mr-1' /> WhatsApp
              </Button>
            </a>

            <a
              href={telegramShare}
              target='_blank'
              rel='noopener noreferrer'
              className='w-[48%] sm:w-auto'
            >
              <Button variant='outline' className='w-full sm:w-auto'>
                <Send className='h-4 mr-1' /> Telegram
              </Button>
            </a>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='default' onClick={onGoToMeetings}>
              К встречам
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessModal;
