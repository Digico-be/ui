import { cva, VariantProps } from 'class-variance-authority'
import { HTMLInputTypeAttribute, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Input } from './components/fields/Input'
import { Textarea } from './components/fields/Textarea'
import { Label } from './components/Label'
import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'

const styles = cva('outline-none transition-all', {
    variants: {
        intent: {
            default: 'rounded border border-grey-400 placeholder:text-grey-600 focus:border-grey-600 focus:bg-grey-200'
        },
        size: {
            default: 'px-6 py-3 text-sm'
        }
    },
    defaultVariants: {
        intent: 'default',
        size: 'default'
    }
})

export type InputVariants = VariantProps<typeof styles>

type BaseFieldProps = {
    className?: string
    label?: React.ReactNode
    intent?: InputVariants['intent']
    size?: InputVariants['size']
}

type ContainerProps = {
    children?: React.ReactNode
    id?: string
    label?: React.ReactNode
    required?: boolean
}

type InputProps = BaseFieldProps & {
    type?: Exclude<HTMLInputTypeAttribute, 'textarea'>
} & InputHTMLAttributes<HTMLInputElement>

type TextareaProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>

type FieldProps = (InputProps & { type?: Exclude<HTMLInputTypeAttribute, 'textarea'> }) | (TextareaProps & { type: 'textarea' })

const Container = ({ children, label, ...props }: ContainerProps) => {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={props.id} required={props.required}>
                {label}
            </Label>

            {children}
        </div>
    )
}

const Field = (props: FieldProps) => {
    const register = useFormContext()?.register

    const formRegister = props.name && register ? register(props.name) : {}

    const { type = 'text', intent, size, className, ...restProps } = { ...props, ...formRegister }

    const computedClassName = clsx(styles({ intent, size }), className)

    if (props.type === 'textarea') {
        return (
            <Container {...restProps}>
                <Textarea {...(restProps as TextareaProps)} className={computedClassName} />
            </Container>
        )
    }

    return (
        <Container {...restProps}>
            <Input {...(restProps as InputProps)} className={computedClassName} />
        </Container>
    )
}

export { Field }
