import { ArrowLeft, ArrowRight, FunnelFill, Search } from '../../../assets/svgs/Icons'
import { styled } from 'styled-components'
import React, { useState } from 'react'
import { FillLink } from '../../buttons'
import { Paths } from '../../../constants'
import { TextField } from '../../inputs'
import { colors } from '../../../theme'
import { DEFAULT_ITEMS_COUNT } from '../../../root/global-constant'

const VIEW_FILTER = 'view_filter';
const VIEW_COLUMN = 'view_column';

const PAGE_COUNTS = [
    {
        label: 20,
        value: 20
    },
    {
        label: 50,
        value: 50
    },
    {
        label: 100,
        value: 100
    },
    {
        label: 200,
        value: 200
    },
];

const TABLE_ACTIONS = [
    {
        label: "Delete",
        value: "delete"
    },
    {
        label: "Update attribute",
        value: "update"
    }
];

interface Props {
    singleColumn?: boolean;
    hasCreateButton?: boolean;
    hasEditColumn?: boolean;
    hasFilter?: boolean;

    hasSearch?: boolean;
    hasPageItemCount?: boolean;
    hasPageNavigation?: boolean;
    hasTableActions?: boolean;

    onPageChange?: any,
    onItemsCountChange?: any,
    onSearch?: any,
    totalPages?: number
}

const defaultProps: Props = {
    singleColumn: false,
    hasCreateButton: true,
    hasEditColumn: true,
    hasFilter: true,
    hasSearch: true,
    hasPageItemCount: true,
    hasPageNavigation: true,
    hasTableActions: true,
    totalPages: 1,
};

export const TableControls: React.FC<Props> = (props) => {

    const {
        singleColumn,
        hasCreateButton,
        hasEditColumn,
        hasFilter,
        hasSearch,
        hasPageItemCount,
        hasPageNavigation,
        hasTableActions,
        totalPages
    } = { ...defaultProps, ...props };

    const [actionView, setActionView] = useState("");
    const [page, setPage] = useState(1);

    const toggleAction = (selected: string) => {

        if (actionView === selected) {
            setActionView('');
        }
        else {
            setActionView(selected)
        }
    }

    const renderSearch = () => {
        return (
            <div className='flex-1'>
                <div className='w-80'>
                    <TextField
                        placeholder="Search by keyword"
                        rounded
                    >
                        <div className='ml-2'>
                            <Search color={colors.inputFocus} size={20} />
                        </div>
                    </TextField>
                </div>
            </div>
        )
    }

    const nextPage = () => {
        const current = page + 1;
        if(current <= totalPages) {
            props.onPageChange(current);
            setPage(current);
        }
    }

    const prevPage = () => {
        const current = page - 1;
        if(current > 0) {
            props.onPageChange(current);
            setPage(current);
        }
    }

    const changePage = (value: any) => {
        const current = parseInt(value);
        if(current < 1 ) {
            props.onPageChange(1);
            setPage(1);
        }
        else if(current > totalPages) {
            props.onPageChange(totalPages);
            setPage(totalPages);
        }
        else {
            props.onPageChange(current);
            setPage(current);
        }
    }

    return (
        <Container className='w-full relative'>
            <div className='flex items-center justify-end w-full space-x-8'>

                {singleColumn && hasSearch && renderSearch()}

                {
                    hasFilter && (
                        <div onClick={() => toggleAction(VIEW_FILTER)}>
                            <FunnelFill />
                        </div>
                    )
                }
                {
                    hasEditColumn && (
                        <div onClick={() => toggleAction(VIEW_COLUMN)}>
                            <label htmlFor='column-toggle'>
                                Columns
                            </label>
                        </div>
                    )
                }
                {
                    hasCreateButton && (
                        <FillLink to={Paths.CREATE}>
                            Create New
                        </FillLink>
                    )
                }
            </div>

            <div>
                {
                    hasFilter && actionView == VIEW_FILTER ? (
                        <div className='bg-white border-t w-full h-40'>
                            Filter
                        </div>
                    ) :
                        hasEditColumn && actionView == VIEW_COLUMN ? (
                            <div className='bg-white border-t w-full h-40'>
                                Columns
                            </div>
                        ) : null
                }
            </div>

            <div className={`flex flex-wrap justify-between ${singleColumn ? '' : 'mt-4'}`}>

                {!singleColumn && hasSearch && renderSearch()}

                <div className='flex flex-wrap space-x-8'>
                    {
                        hasPageNavigation && (
                            <div className='flex items-center'>
                                <div className='font-bold mr-2'>
                                    {totalPages} Pages
                                </div>
                                <div className='flex border rounded-md'>
                                    <button 
                                        className={
                                            `flex justify-center items-center w-12
                                            ${page <= 1 ? 'opacity-40' : ''}
                                        `}
                                        onClick={prevPage}
                                        disabled={page == 1}
                                    >
                                        <ArrowLeft />
                                    </button>
                                    <div className='border-r border-l w-12'>
                                        <TextField
                                            className='text-center'
                                            type='number'
                                            unbordered
                                            value={page.toString()}
                                            onChange={(e) => setPage(parseInt(e.target.value))}
                                            onSubmit={changePage}
                                        />
                                    </div>
                                    <button 
                                       className={
                                        `flex justify-center items-center w-12
                                            ${page >= totalPages ? 'opacity-40' : ''}
                                        `}
                                        onClick={nextPage}
                                        disabled={page == totalPages}
                                    >
                                        <ArrowRight />
                                    </button>
                                </div>
                            </div>
                        )
                    }

                    {
                        hasPageItemCount && (
                            <div className='flex items-center'>
                                <div className='font-bold mr-2'>
                                    Show
                                </div>
                                <div className='w-12'>
                                    <TextField
                                        className='text-center'
                                        type='number'
                                        min={1}
                                        max={100}
                                        defaultValue={DEFAULT_ITEMS_COUNT}
                                        onSubmit={props.onItemsCountChange}
                                    />
                                </div>
                            </div>
                        )
                    }

                    {
                        hasTableActions && (
                            <div>
                                <div>
                                    {/* <FormControl2 flexible className='w-56'>
                                        <FormSelect
                                            options={TABLE_ACTIONS}
                                        />
                                    </FormControl2> */}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Container>
    )
}


const Container = styled.div`
    padding: 1rem;
`