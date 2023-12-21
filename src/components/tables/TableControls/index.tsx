import { FormControl, FormControl2, FormInput } from '../../forms'
import { FormSelect } from '../../forms/FormSelect'
import { ArrowLeft, ArrowRight, FunnelFill, Search } from '../../../assets/svgs/Icons'
import { styled } from 'styled-components'
import React, { useState } from 'react'
import { FillLink } from '../../buttons'
import { Paths } from '../../../constants'

interface Props {
    singleColumn?: boolean;
    hasCreateButton?: boolean;
    hasEditColumn?: boolean;
    hasFilter?: boolean;

    hasSearch?: boolean;
    hasPageItemCount?: boolean;
    hasPageNavigation?: boolean;
    hasTableActions?: boolean;
}

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

const Container = styled.div`
    padding: 1rem;
`

const defaultProps: Props = {
    singleColumn: false,
    hasCreateButton: true,
    hasEditColumn: true,
    hasFilter: true,
    hasSearch: true,
    hasPageItemCount: true,
    hasPageNavigation: true,
    hasTableActions: true,
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
    } = { ...defaultProps, ...props };

    const [actionView, setActionView] = useState("");

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
                    {/* <FormControl2 flexible className='w-full'>

                        <div className='ml-2'>
                            <Search color={colors.inputFocus} size={20} />
                        </div>
                        <FormInput
                            placeholder="Search by keyword"
                        />
                    </FormControl2> */}
                </div>
            </div>
        )
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
                                    200 Pages
                                </div>
                                <div className='flex border rounded-md'>
                                    <button className='flex justify-center items-center w-12'>
                                        <ArrowLeft />
                                    </button>
                                    <div className='border-r border-l'>
                                        {/* <FormControl2 unbordered className='m-0 p-0 w-12'>
                                            <FormInput
                                                className='text-center'
                                                defaultValue='20'
                                            />
                                        </FormControl2> */}
                                    </div>
                                    <button className='flex justify-center items-center w-12'>
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
                                <div className='flex rounded-md'>
                                    {/* <FormControl2 className='w-18'>
                                        <FormSelect
                                            placeholder=""
                                            options={PAGE_COUNTS}
                                        />
                                    </FormControl2> */}
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