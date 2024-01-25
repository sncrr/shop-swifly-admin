import { ArrowRight } from "../../../assets/svgs/Icons"
import { FormGroup, FormInput, FormSection, Submit } from "../../forms";

const SettingsPageTitle = ({ titles }: any) => {

    return (
        <>
            <div className="text-lg font-semibold p-6 flex items-center ">
                <div className="flex items-center space-x-2 flex-1">
                    <span>Settings</span>
                    <ArrowRight />
                    <span>{titles[0]}</span>
                    <ArrowRight />
                    <span>{titles[1]}</span>
                </div>
                
                <Submit 
                    text="Save"
                />
            </div>
            <div>
                <FormSection>
                    <FormGroup>
                        <FormInput
                            name="section"
                            className="hidden"
                        />
                    </FormGroup>
                </FormSection>
            </div>
        </>
    )
}

export default SettingsPageTitle;