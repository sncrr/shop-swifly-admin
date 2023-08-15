import { FormControl, FormGroup, FormInput } from '../../forms'
import { FormSelect } from '../../forms/FormSelect'
import { FunnelFill } from '../../../assets/svgs'
import { FillButton } from '../../buttons/FillButton'
import { styled } from 'styled-components'

const Container = styled.div`
    #filter-view {
        display: none;
    }

    #filter-toggle:hover ~ #filter-view {
        display: block;
    }
`

export function TableActions() {

    return (
        <Container className='w-full relative'>
            <div className='flex items-center justify-end w-full space-x-8'>
                <input id='filter-toggle' type='checkbox' />
                <label htmlFor='filter-toggle'>
                    <FunnelFill />
                </label>
                <div>
                    <span>Columns</span>
                </div>
                <FillButton>
                    Create New
                </FillButton>
            </div>
            <div id='filter-view' className='bg-white border-t w-full z-10 h-40'>

            </div>
            <div className='flex justify-between'>
                <div>
                    <FormGroup className='w-80'>
                        <FormControl className='w-full'>
                            <FormInput
                                placeholder="Search by keyword"
                            />
                        </FormControl>
                    </FormGroup>
                </div>
                <div className='flex space-x-8'>
                    <div>
                        <FormGroup className='items-center'>
                            <FormControl className='w-16'>
                                <FormInput
                                    className='text-center'
                                    defaultValue='20'
                                />
                            </FormControl>
                            <div className='ml-2'>
                                <label>per page</label>
                            </div>
                        </FormGroup>
                    </div>
                    <div className='flex items-center'>
                        <div>Prev</div>
                        <div className='mx-2'>
                            <FormGroup className='items-center'>
                                <FormControl className='w-14'>
                                    <FormInput
                                        className='text-center'
                                        defaultValue='20'
                                    />
                                </FormControl>
                                <div className='ml-2'>
                                    <label>of 299</label>
                                </div>
                            </FormGroup>
                        </div>
                        <div>Next</div>
                    </div>

                    <div>
                        <FormGroup>
                            <FormControl className='w-56'>
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
                            </FormControl>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </Container>
    )
}