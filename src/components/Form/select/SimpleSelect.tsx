'use client'

import dynamic from 'next/dynamic'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { Label } from '../components/Label'
import { styleSelect } from '.'

const Select = dynamic(() => import('react-select'), { ssr: false })

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
    onChange?: (option: OptionType) => void
}

export const SimpleSelect = ({ label, onChange, className, value: propValue, options, ...props }: Props) => {
    const [selectedOption, setSelectedOption] = useState<OptionType>(options[0])

    useEffect(() => {
        const newSelectedOption = options.find((option) => option.value === propValue) || null
        setSelectedOption(newSelectedOption)
    }, [propValue, options])

    return (
        <div className="flex flex-col gap-2">
            <Label required={props.required}>{label}</Label>
            <Select
                //@ts-ignore
                value={selectedOption.value}
                onChange={(option: OptionType) => {
                    setSelectedOption(option)
                    if (onChange) {
                        onChange(option)
                    }
                }}
                options={options}
                className={clsx('', className)}
                styles={styleSelect}
            />
        </div>
    )
}
