import { TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ ...props }: Props) => {
    return <textarea {...props} />
}
