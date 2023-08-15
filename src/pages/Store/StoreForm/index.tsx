import { 
    Form, 
    FormControl, 
    FormGroup, 
    FormInput, 
    FormLabel, 
    FormRow 
} from "../../../components/forms";
import { FormToggle } from "../../../components/forms/FormToggle";

export function StoreForm () {

    return (
        <section>
            <Form onSubmit={() => {}}>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <FormInput
                            type="text"
                            name="name"
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Is Active</FormLabel>
                    <FormControl $unbordered>
                        <FormToggle />
                    </FormControl>
                </FormGroup>
                </Form>
        </section>
    )
}