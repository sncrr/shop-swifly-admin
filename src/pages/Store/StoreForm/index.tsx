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

export function StoreForm () {

    const handleSubmit = (e:any) => {
        e.preventDefault();

        // let data = formUtils.getFormData(e.target);
    }

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl flexible>
                        <FormInput
                            type="text"
                            name="name"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Code</FormLabel>
                    <FormControl flexible>
                        <FormInput
                            type="text"
                            name="code"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Address</FormLabel>
                    <FormControl flexible>
                        <FormInput
                            type="text"
                            name="address"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Is Active</FormLabel>
                    <FormControl unbordered>
                        <FormToggle
                            name="isActive"
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Time Open</FormLabel>
                    <FormControl flexible>
                        <FormInput
                            type="time"
                            name="timeOpen"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Time Close</FormLabel>
                    <FormControl flexible>
                        <FormInput
                            type="time"
                            name="timeClose"
                            required
                        />
                    </FormControl>
                </FormGroup>
                <ButtonGroup>
                    <Submit text="SAVE" />
                </ButtonGroup>
            </Form>
        </section>
    )
}