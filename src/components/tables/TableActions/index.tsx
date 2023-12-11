import { FormControl, FormControl2, FormInput } from '../../forms'
import { FormSelect } from '../../forms/FormSelect'
import { FunnelFill, Search } from '../../../assets/svgs'
import { styled } from 'styled-components'
import { useState } from 'react'
import { colors } from '../../../theme'
import { FillBtn, FillLink } from '../../buttons'
import { Paths } from '../../../constants'

const VIEW_FILTER = 'view_filter';
const VIEW_COLUMN = 'view_column';

const Container = styled.div`

`

export function TableActions() {

    const [actionView, setActionView] = useState("");

    const toggleAction = (selected:string) => {

        if(actionView === selected) {
            setActionView('');
        }
        else {
            setActionView(selected)
        }
    }

    return (
        <Container className='w-full relative'>
            <div className='flex items-center justify-end w-full space-x-8'>
                <div onClick={() => toggleAction(VIEW_FILTER)}>
                    <FunnelFill />
                </div>
                <div onClick={() => toggleAction(VIEW_COLUMN)}>
                    <label htmlFor='column-toggle'>
                        Columns
                    </label>
                </div>
                <FillLink to={Paths.ADD}>
                    Create New
                </FillLink>
            </div>
            <div>
                {
                    actionView == VIEW_FILTER ? (
                        <div className='bg-white border-t w-full z-10 h-40'>
                            Filter
                        </div>
                    ) :
                    actionView == VIEW_COLUMN ? (
                        <div className='bg-white border-t w-full z-10 h-40'>
                            Columns
                        </div>
                    ) : null
                }
            </div>
            <div className='flex flex-wrap justify-between mt-1'>
                <div>
                    <div className='w-80'>
                        <FormControl2 flexible className='w-full'>
                            <FormInput
                                placeholder="Search by keyword"
                            />
                            <div className='mr-2'>
                                <Search color={colors.inputFocus} size={20} />
                            </div>
                        </FormControl2>
                    </div>
                </div>
                <div className='flex flex-wrap space-x-8'>
                    <div>
                        <div className='flex items-center'>
                            <FormControl2 flexible className='w-16'>
                                <FormInput
                                    className='text-center'
                                    defaultValue='20'
                                />
                            </FormControl2>
                            <div className='ml-2'>
                                <label>per page</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div>Prev</div>
                        <div className='mx-2'>
                            <div className='flex items-center'>
                                <FormControl2 flexible className='w-14'>
                                    <FormInput
                                        className='text-center'
                                        defaultValue='20'
                                    />
                                </FormControl2>
                                <div className='ml-2'>
                                    <label>of 299</label>
                                </div>
                            </div>
                        </div>
                        <div>Next</div>
                    </div>

                    <div>
                        <div>
                            <FormControl2 flexible className='w-56'>
                                <FormSelect
                                    options={[
                                        {
                                            label: "Delete",
                                            value: "delete"
                                        },
                                        {
                                            label: "Update attribute",
                                            value: "update"
                                        }
                                    ]}
                                />
                            </FormControl2>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}