import { FormGroup, FormInput, FormLabel, FormSection } from "../../../../components/forms";

const Web = () => {

    return (
        <div className="w-full">
            <FormSection>
                <FormGroup>
                    <FormLabel>Front End URL</FormLabel>
                    <FormInput name="frontEndUrl" />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Media URL</FormLabel>
                    <FormInput name="mediaUrl" />
                </FormGroup>
            </FormSection>
        </div>
    )
}

export default Web;