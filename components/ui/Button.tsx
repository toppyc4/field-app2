import { FC } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import {cn} from '../../lib/utils'
import { forwardRef } from 'react'

const buttonStyles = cva(
    'text-white rounded font-semibold px-1 py-0.5 lg:px-2 lg:py-1  xl:font-bold  xl:px-4  xl:py-2 ',
    {
        variants: {
            variant: {
                primaryBlue: 'bg-blue-500 hover:bg-blue-400 border-solid border-b-4 border-blue-700 hover:border-blue-500',
                secondaryGreen: 'flex mx-auto my-[0.42rem] w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-emerald-700 hover:border-emerald-500 rounded', 
                tertiaryOrange: 'flex bg-lime-500 hover:bg-lime-400 text-white font-bold my-auto mr-3 p-1 max-h-[50px] border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded overflow-hidden',
                danger: ''
            },
        }
    }
)

export interface ButtonProps 
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonStyles> {
            href?: string
        }

const Button: FC<ButtonProps> = ({className,  variant, ...props}) => {
    return ( 
        <button className={cn(buttonStyles({variant, className}))} {...props}/>
    );
}
 
export {Button, buttonStyles};



