import React from 'react';

import {block} from '../../utils';

import './LongValue.scss';

const b = block('long-value');

export interface LongValueProps {
    value?: string | number | boolean;
    className?: string;
}

export const LongValue: React.FC<LongValueProps> = ({value, className}) => {
    const prevValue = React.useRef<typeof value | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    const [long, setLong] = React.useState(false);

    const handleClick = React.useCallback(() => setOpen((f) => !f), [setOpen]);

    React.useEffect(() => {
        if (ref.current) {
            if (value !== prevValue.current) {
                const {offsetWidth, scrollWidth} = ref.current;

                if (offsetWidth < scrollWidth) {
                    if (!long) {
                        setLong(true);
                    }
                } else {
                    if (long) {
                        setLong(false);
                    }

                    if (open) {
                        setOpen(false);
                    }
                }

                prevValue.current = value;
            }
        }
    });

    return (
        <div
            ref={ref}
            className={b({open, long}, className)}
            onClick={long ? handleClick : undefined}
        >
            {value}
        </div>
    );
};
