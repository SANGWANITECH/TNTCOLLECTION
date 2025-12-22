import { Button } from '@/components/ui/button';

type Props = {
    title: string;
}

export default function SaveButton({ title }: Props) {
    return (
        <Button
            className={'bg-[#3B85F4] w-full text-lg text-white'}
            size="xl">
            {title}
        </Button>
    )
}