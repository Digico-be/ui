import { useFormContext } from 'react-hook-form'
import { cva, VariantProps } from 'class-variance-authority'
import { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

const styles = cva('', {
    variants: {
        intent: {
            default:
                'flex text-xs relative pl-10 cursor-pointer leading-[1.1] peer-checked:after:opacity-100 peer-checked:before:border-primary before:bg-grey-100 before:w-7 before:h-7 before:absolute before:top-0 before:left-0 before:rounded-sm after:rounded-sm before:border before:border-grey-600 before:transition-all after:w-7 after:h-7 after:absolute after:top-0 after:left-0 after:bg-primary after:transition-opacity after:opacity-0 after:scale-[.6] font-medium'
        }
    },
    defaultVariants: {
        intent: 'default'
    }
})

type InputVariants = VariantProps<typeof styles>

type Props = {
    id: string
    label: string
    intent?: InputVariants['intent']
    type?: 'checkbox' | 'radio'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const Checkbox = ({ label, className, type = 'checkbox', ...props }: Props) => {
    const { register } = useFormContext() || {}

    const formRegister = props.name ? register?.(props.name) : undefined

    const computedClassName = clsx(styles({ intent: props.intent }), className)

    return (
        <div>
            <input className="hidden peer" type={type} {...props} {...formRegister} />

            <label className={computedClassName} htmlFor={props.id}>
                {label}
            </label>
        </div>
    )
}
