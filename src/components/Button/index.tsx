import { cva, VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import Link from 'next/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

const styles = cva(
    'transition-all leading-tight inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-70 outline-none cursor-pointer',
    {
        variants: {
            intent: {
                default: 'bg-primary text-white hover:bg-primary-active focus:bg-primary-active font-medium rounded',
                grey200: 'bg-grey-200 border border-grey-400 hover:bg-grey-400 focus:bg-grey-400 font-medium rounded ',
                grey400: 'bg-grey-400 hover:bg-primary hover:text-white focus:text-white focus:bg-primary font-medium rounded ',
                main: 'bg-main text-white hover:bg-primary focus:bg-primary font-medium rounded ',

                success:
                    'border border-success/40 bg-success-200 font-medium text-success rounded hover:bg-success focus:bg-success hover:text-white focus:text-white',
                warning:
                    'border border-warning/40 bg-warning-200 font-medium text-warning rounded hover:bg-warning focus:bg-warning hover:text-white focus:text-white',
                error: 'border border-error/40 bg-error-200 font-medium text-error rounded hover:bg-error focus:bg-error hover:text-white focus:text-white',

                text: 'font-medium underline text-grey-600 transition-all hover:text-main'
            },
            size: {
                text: 'text-xs',
                default: 'text-xs px-10 py-4'
            }
        },
        defaultVariants: {
            intent: 'default',
            size: 'default'
        }
    }
)

type Variants = VariantProps<typeof styles>

type BaseProps = {
    children: React.ReactNode

    isLoading?: boolean
    intent?: Variants['intent']
    size?: Variants['size']
    className?: string
    disabled?: boolean
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type Props = ButtonProps | LinkProps

export const Button = ({ href, isLoading, intent, size, className, children, ...restProps }: Props) => {
    const computedClassName = clsx(styles({ intent, size }), className)

    if (href) {
        const isExternal = href.startsWith('http') || href.startsWith('//')

        if (isExternal) {
            return (
                <a href={href} className={computedClassName} rel="noopener noreferrer" {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {children}
                </a>
            )
        }

        return (
            <Link href={href} className={computedClassName} {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </Link>
        )
    }

    return (
        <button {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)} className={computedClassName} disabled={isLoading || restProps.disabled}>
            {isLoading ? (
                <div className="pointer-events-none border-current inline-block relative before:block before:absolute before:w-full before:h-full before:rounded-full before:border-solid before:border-2 before:border-t-current before:border-r-current before:border-b-transparent before:border-l-transparent before:animate-spin"></div>
            ) : (
                children
            )}
        </button>
    )
}
