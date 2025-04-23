<script setup lang="ts">
import { CreateUser, SignUpSuccess } from '@/services/authService'
import { email, textInput } from '@/services/validationService'
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'primevue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const { mutate: createUserMutation } = useMutation(CreateUser)
const toast = useToast()

const firstName = ref<string>('')
const lastName = ref<string>('')
const address = ref<string>('')
const emailAddress = ref<string>('')
const phone = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const validateFields = () => {
  // validatng manually all the fields
  if (
    textInput(firstName.value) &&
    textInput(lastName.value) &&
    textInput(address.value) &&
    email(emailAddress.value) &&
    textInput(phone.value) &&
    textInput(password.value) &&
    textInput(confirmPassword.value)
  ) {
    return true
  } else {
    return false
  }
}

const showSuccessToast = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Sign Up Successful !',
    life: 3000,
  })
}
const showErrorToast = () => {
  toast.add({
    severity: 'danger',
    summary: 'Error',
    detail: 'Error Signing up',
    life: 3000,
  })
}

const submitUser = async () => {
  try {
    if (validateFields() && password.value === confirmPassword.value) {
      const { data } = await createUserMutation({
        userInfo: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          email: emailAddress.value,
          phone: phone.value,
          password: password.value,
        },
      })
      if (data?.createUser) {
        showSuccessToast()
        SignUpSuccess()
      } else {
        showErrorToast()
      }
    } else showErrorToast()
  } catch (error) {
    showErrorToast()
    console.error('Error creating product:', error)
    throw error
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 border-2 p-12 w-3/5 border-gray-500 rounded-lg">
    <div class="flex gap-5">
      <InputText v-model="firstName" class="w-full" type="text" placeholder="First Name" />
      <InputText v-model="lastName" class="w-full" type="text" placeholder="Last Name" />
    </div>
    <InputText v-model="address" class="w-full" type="text" placeholder="Address" />
    <div class="flex gap-5">
      <InputText v-model="emailAddress" class="w-full" type="email" placeholder="Email" />
      <InputText v-model="phone" class="w-full" type="text" placeholder="Phone Number" />
    </div>
    <Password v-model="password" :feedback="false" placeholder="Password" toggleMask />
    <Password
      v-model="confirmPassword"
      :feedback="false"
      placeholder="Confirm Password"
      toggleMask
    />

    <Button
      class="text-xl! bg-sky-600! border-sky-600! text-white! font-semibold"
      severity="info"
      @click="submitUser"
    >
      REGISTER
    </Button>

    <div class="text-center text-lg">
      Already have an account? <RouterLink to="/login" class="text-sky-400">Sign In</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
