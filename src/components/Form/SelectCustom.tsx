import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form'
import { SimpleSelect } from './SimpleSelect'

type OptionType = {
    label: string
    value: string | number
}

type Props = {
    name?: string
    required?: boolean
    label?: string
    className?: string
    options: OptionType[]
    value?: string
    field?: ControllerRenderProps<FieldValues, string>
    onChange?: (value: string | number) => void
}

export const SelectReacHookForm = ({ className, name, label, onChange, ...props }: Props) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <SimpleSelect field={field} {...props} />
            }}
        />
    )
}
