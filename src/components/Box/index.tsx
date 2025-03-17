import { cva, VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const styles = cva('relative rounded', {
    variants: {
        intent: {
            info: 'bg-white border border-grey-400',
            success: 'bg-success-200',
            warning: 'bg-warning-200',
            error: 'bg-error-200'
        },
        size: {
            sm: 'p-8',
            default: 'p-12',
            xl: 'p-24'
        }
    },
    defaultVariants: {
        intent: 'info',
        size: 'default'
    }
})

type Variants = VariantProps<typeof styles>

type Props = {
    children: React.ReactNode
    className?: string
    intent?: Variants['intent']
    size?: Variants['size']
    title?: string
    isLoading?: boolean
}

export const Box = ({ children, className, intent, size, title, isLoading, ...props }: Props) => {
    return (
        <div className={clsx(styles({ intent, size }), className)} {...props}>
            {isLoading ? (
                <div className="bg-white/40 w-full h-full absolute top-0 left-0 z-20 flex justify-center items-center">
                    <div className="size-10 pointer-events-none border-current inline-block relative -translate-x-1/2 -translate-y-1/2 before:block before:absolute before:w-full before:h-full before:rounded-full before:border-solid before:border-2 before:border-t-current before:border-r-current before:border-b-transparent before:border-l-transparent before:animate-spin"></div>
                </div>
            ) : null}

            {title && <span className="text-md font-bold mb-8 block">{title}</span>}
            {children}
        </div>
    )
}
