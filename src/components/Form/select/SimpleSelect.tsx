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
    defaultValue?: string | number
    onChange?: (option: OptionType) => void
}

export const SimpleSelect = ({ label, onChange, options, ...props }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <Label required={props.required}>{label}</Label>
            <Select
                onChange={(option: OptionType) => {
                    if (onChange) {
                        onChange(option)
                    }
                }}
                options={options}
                styles={styleSelect}
                {...props}
            />
        </div>
    )
}
