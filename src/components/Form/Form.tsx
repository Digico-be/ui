import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { clsx } from 'clsx'
import { Group } from './Group'
import { Row } from './Row'
import { Field } from './Field'
import { Checkbox } from './Checkbox'
import { SelectCustom } from './select/SelectCustom'
import { CustomFile } from './file/CustomFile'

type Props<T extends FieldValues> = {
    children: React.ReactNode
    useForm: UseFormReturn<T>

    className?: string
    onSubmit?: (data: T) => void
    onChange?: (data: T) => void
    onInput?: (data: T) => void
}

const Form = <T extends FieldValues>({ children, useForm, className, onSubmit, onChange, onInput, ...props }: Props<T>) => {
    const formProps = {
        ...props,
        noValidate: true,
        autoComplete: 'off',
        onSubmit: onSubmit ? useForm.handleSubmit(onSubmit) : undefined,
        onChange: onChange ? useForm.handleSubmit(onChange) : undefined,
        onInput: onInput ? useForm.handleSubmit(onInput) : undefined
    }

    return (
        <FormProvider {...useForm}>
            <form className={clsx('flex flex-col gap-12', className)} {...formProps}>
                {children}
            </form>
        </FormProvider>
    )
}

Form.Group = Group
Form.Row = Row
Form.Field = Field
Form.Checkbox = Checkbox
Form.Select = SelectCustom
Form.File = CustomFile

export { Form }
