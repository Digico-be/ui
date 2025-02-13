import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'

type columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type GridProps = {
    children: React.ReactNode
    className?: string
}

type ItemProps = {
    children: React.ReactNode
    className?: string
    column?: columns
}

const styles = cva('', {
    variants: {
        column: {
            1: 'col-span-1',
            2: 'col-span-2',
            3: 'col-span-3',
            4: 'col-span-4',
            5: 'col-span-5',
            6: 'col-span-6',
            7: 'col-span-7',
            8: 'col-span-8',
            9: 'col-span-9',
            10: 'col-span-10',
            11: 'col-span-11',
            12: 'col-span-12'
        }
    },
    defaultVariants: {
        column: 12
    }
})

const Grid = ({ children, className }: GridProps) => {
    return <div className={clsx('grid grid-cols-12 gap-12', className)}>{children}</div>
}

const Col = ({ className, children, column = 12 }: ItemProps) => {
    return <div className={styles({ column, className })}>{children}</div>
}

Grid.Col = Col

export { Grid }
