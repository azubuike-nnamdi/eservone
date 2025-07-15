import { useState } from 'react'

interface ModalState {
  visible: boolean
  type: 'success' | 'error' | 'loading'
  title: string
  message: string
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    type: 'success',
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancel: false
  })

  const showSuccess = (
    title: string,
    message: string,
    onConfirm?: () => void,
    confirmText?: string
  ) => {
    setModalState({
      visible: true,
      type: 'success',
      title,
      message,
      onConfirm,
      confirmText: confirmText || 'OK',
      showCancel: false
    })
  }

  const showError = (
    title: string,
    message: string,
    onConfirm?: () => void,
    confirmText?: string
  ) => {
    setModalState({
      visible: true,
      type: 'error',
      title,
      message,
      onConfirm,
      confirmText: confirmText || 'OK',
      showCancel: false
    })
  }

  const showLoading = (
    title: string,
    message: string
  ) => {
    setModalState({
      visible: true,
      type: 'loading',
      title,
      message,
      confirmText: 'OK',
      showCancel: false
    })
  }

  const showConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string
  ) => {
    setModalState({
      visible: true,
      type: 'success',
      title,
      message,
      onConfirm,
      confirmText: confirmText || 'Confirm',
      cancelText: cancelText || 'Cancel',
      showCancel: true
    })
  }

  const hideModal = () => {
    setModalState(prev => ({ ...prev, visible: false }))
  }

  return {
    modalState,
    showSuccess,
    showError,
    showLoading,
    showConfirmation,
    hideModal
  }
} 