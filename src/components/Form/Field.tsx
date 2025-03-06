import { cva, VariantProps } from 'class-variance-authority'
import { HTMLInputTypeAttribute, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Input } from './components/fields/Input'
import { Textarea } from './components/fields/Textarea'
import { Label } from './components/Label'
import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'
import { Suffix } from './components/Suffix'
import { Prefix } from './components/Prefix'

const styles = cva('outline-none transition-all w-full', {
    variants: {
        intent: {
            default: 'rounded border border-grey-400 placeholder:text-grey-600 focus:border-grey-600 focus:bg-grey-200'
        },
        size: {
            default: 'px-6 py-3 text-sm'
        },
        suffix: {
            false: '',
            true: 'rounded-r-none'
        },
        prefix: {
            false: '',
            true: 'rounded-l-none'
        }
    },
    defaultVariants: {
        intent: 'default',
        size: 'default',
        suffix: false,
        prefix: false
    }
})

export type InputVariants = VariantProps<typeof styles>

type BaseFieldProps = {
    className?: string
    label?: React.ReactNode
    intent?: InputVariants['intent']
    size?: InputVariants['size']
    suffix?: string
    prefix?: string
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

    const { type = 'text', intent, size, className, suffix, prefix, ...restProps } = { ...props, ...formRegister }

    const computedClassName = clsx(styles({ intent, size, suffix: Boolean(suffix) }), className)

    if (props.type === 'textarea') {
        return (
            <Container {...restProps}>
                <div className="flex">
                    <Textarea {...(restProps as TextareaProps)} className={computedClassName} />
                    <Suffix>{suffix}</Suffix>
                </div>
            </Container>
        )
    }

    return (
        <Container {...restProps}>
            <div className="flex">
                <Prefix>{prefix}</Prefix>
                <Input {...(restProps as InputProps)} className={computedClassName} type={props.type} />
                <Suffix>{suffix}</Suffix>
            </div>
        </Container>
    )
}

export { Field }
