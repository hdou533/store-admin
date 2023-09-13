'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import {useState} from 'react'


import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';



const formSchema = z.object({
    name: z.string().min(2).max(50)
})


export const StoreModal = () => {
    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post("/api/stores", values)
            console.log(response.data)
            toast.success("Store created.")

        } catch (error) {
            toast.error("Something was wrong.")
        } finally {
            setLoading(false)
        }
    }
        
    return (
        <Modal
            title="Create Store"
            description="add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    name
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="e-commerce" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the name of you e-commerce shop
                                </FormDescription>
                                <FormMessage />
                            </FormItem> 
                            
                            
                        )}
                    />
                    <div className='flex items-cetner justify-end space-x-2'>
                        <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                        <Button disabled={loading} type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </Modal>
        )

}
