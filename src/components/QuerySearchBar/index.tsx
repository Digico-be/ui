'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { debounce } from '@digico/utils'
import clsx from 'clsx'

type Props = {
    className?: string
}

export const QuerySearchBar = ({ className }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const formData = useForm({
        defaultValues: {
            search: searchParams.get('search') ?? ''
        }
    })

    const handleSearch = debounce(() => {
        const search = formData.getValues('search')
        const params = new URLSearchParams(searchParams)
        params.delete('page')
        params.set('search', search)
        router.push(`?${params.toString()}`)
    }, 400)

    const handleClear = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('search')
        formData.setValue('search', '')
        router.push(`?${params.toString()}`)
    }

    return (
        <div className={clsx('relative', className)}>
            <div className="absolute top-1/2 left-5 -translate-y-1/2">
                <svg className="size-5 fill-grey-800" enable-background="new 0 0 16 16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="m15.2 15.8c-.2 0-.3-.1-.4-.2l-3.8-3.7c-2.6 2.2-6.4 2-8.9-.4-2.6-2.6-2.6-6.7 0-9.3 1.3-1.3 2.9-2 4.7-2s3.4.7 4.7 1.9c1.2 1.2 1.9 2.9 1.9 4.7 0 1.6-.5 3-1.5 4.2l3.7 3.7c.2.2.2.6 0 .8-.1.2-.3.3-.4.3zm-8.4-14.4c-1.4 0-2.8.6-3.8 1.6-2.1 2.1-2.1 5.5 0 7.6s5.5 2.1 7.6 0c1-1 1.6-2.4 1.6-3.8s-.6-2.8-1.6-3.8-2.4-1.6-3.8-1.6z" />
                </svg>
            </div>

            <input
                {...formData.register('search')}
                onInput={handleSearch}
                className="pl-14 pr-6 py-4 text-xs outline-none border border-grey-600 rounded w-full"
                type="text"
                placeholder="Recherche"
            />

            {formData.watch('search') && (
                <button className="absolute top-1/2 right-5 -translate-y-1/2 group" onClick={handleClear}>
                    <svg
                        className="size-5 fill-grey-800 transition-all group-hover:fill-main"
                        enable-background="new 0 0 24 24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m22.5 23.8c-.3 0-.7-.1-.9-.4l-9.6-9.5-9.6 9.6c-.5.5-1.3.5-1.9 0s-.5-1.3 0-1.9l9.6-9.6-9.5-9.6c-.5-.5-.5-1.3 0-1.9s1.3-.5 1.9 0l9.6 9.6 9.6-9.6c.5-.5 1.3-.5 1.9 0s.5 1.3 0 1.9l-9.7 9.6 9.6 9.6c.5.5.5 1.3 0 1.9-.3.2-.7.3-1 .3z" />
                    </svg>
                </button>
            )}
        </div>
    )
}
