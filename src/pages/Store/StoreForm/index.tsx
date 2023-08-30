import { 
    ButtonGroup,
    Form, 
    FormControl, 
    FormGroup, 
    FormInput, 
    FormLabel,
    Submit,
} from "../../../components/forms";
import { FormToggle } from "../../../components/forms/FormToggle";
import { formUtils } from "../../../utils";

export function StoreForm () {

    const handleSubmit = (e:any) => {
        e.preventDefault();

        let data = formUtils.getFormData(e.target);
    }

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl $flex1>
                        <FormInput
                            type="text"
                            name="name"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Code</FormLabel>
                    <FormControl $flex1>
                        <FormInput
                            type="text"
                            name="code"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Address</FormLabel>
                    <FormControl $flex1>
                        <FormInput
                            type="text"
                            name="address"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Is Active</FormLabel>
                    <FormControl $unbordered>
                        <FormToggle />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Time Open</FormLabel>
                    <FormControl $flex1>
                        <FormInput
                            type="time"
                            name="timeOpen"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Time Close</FormLabel>
                    <FormControl $flex1>
                        <FormInput
                            type="time"
                            name="timeClose"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <ButtonGroup>
                    <Submit>
                        Save
                    </Submit>
                </ButtonGroup>
            </Form>
        </section>
    )
}