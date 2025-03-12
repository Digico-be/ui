import dynamic from 'next/dynamic'

import { Controller, useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import { Label } from '../components/Label'
import { styleSelect } from '.'

const Select = dynamic(() => import('react-select'), { ssr: false })

type OptionType = {
    label: string
    value: string | number
}

type Props = {
    name: string
    required?: boolean
    label?: string
    className?: string
    options: OptionType[]
    onChange?: (value: string | number) => void
}

export const SelectCustom = ({ className, name, label, onChange, ...props }: Props) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <div className="flex flex-col gap-2">
                        <Label required={props.required}>{label}</Label>
                        <Select
                            {...field}
                            {...props}
                            //@ts-ignore
                            onChange={(selectedOption: any) => {
                                field.onChange(selectedOption?.value)
                                if (onChange) {
                                    onChange(selectedOption?.value)
                                }
                            }}
                            value={props.options.find((opt) => opt.value === field.value) || null}
                            className={clsx('', className)}
                            styles={styleSelect}
                        />
                    </div>
                )
            }}
        />
    )
}
