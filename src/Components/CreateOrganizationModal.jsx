import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 18, 0.85);
  backdrop-filter: blur(4px);
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 24px;
`

const ModalContainer = styled.div`
  width: 100%;
  max-width: 650px;
  background: #11161c;
  border-radius: 28px;
  padding: 48px 56px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 24px;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(17, 22, 28, 0.9);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 32px;
  margin: 0 0 8px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #cbd5f5;
  text-align: center;
  margin: 0 0 32px 0;
`

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
`

const StepDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => (props.$active ? '#66B22E' : 'rgba(255, 255, 255, 0.2)')};
  transition: background 0.2s ease;
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FieldRow = styled.div`
  display: flex;
  gap: 16px;
  
  ${FieldGroup} {
    flex: 1;
    min-width: 0;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`

const FieldLabel = styled.label`
  font-size: 13px;
  color: #9aa3b5;
  font-family: 'Inter', sans-serif;
`

const Input = styled.input`
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(21, 26, 31, 0.95);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(102, 178, 46, 0.9);
    box-shadow: 0 0 0 4px rgba(102, 178, 46, 0.2);
  }
`

const Select = styled.select`
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(21, 26, 31, 0.95);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  cursor: pointer;
  appearance: none;

  &:focus {
    outline: none;
    border-color: rgba(102, 178, 46, 0.9);
    box-shadow: 0 0 0 4px rgba(102, 178, 46, 0.2);
  }
`

const UploadBox = styled.label`
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  background: rgba(21, 26, 31, 0.95);
  padding: 32px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(102, 178, 46, 0.7);
    background: rgba(21, 26, 31, 0.85);
  }

  span {
    font-family: 'Inter', sans-serif;
    color: #d6dae2;
  }

  input {
    display: none;
  }
`

const ImagePreview = styled.div`
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(21, 26, 31, 0.9);
  overflow: hidden;
  position: relative;
  display: grid;
  place-items: center;
  padding: 16px;
`

const PreviewImg = styled.img`
  display: block;
  object-fit: cover;
  width: ${props => props.$logo ? '100px' : '100%'};
  height: ${props => props.$logo ? '100px' : '220px'};
  border-radius: ${props => props.$logo ? '50%' : '12px'};
`

const PreviewToolbar = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 8px;
`

const SmallButton = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(17, 22, 28, 0.9);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
`

const GhostButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(102, 178, 46, 0.4);
  background: transparent;
  color: #d7f0ba;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(102, 178, 46, 0.7);
    background: rgba(102, 178, 46, 0.08);
  }
`

const PrimaryButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: #66b22e;
  color: #0a0e12;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #5a9f29;
    box-shadow: 0 16px 32px rgba(102, 178, 46, 0.3);
  }

  &:disabled {
    background: rgba(102, 178, 46, 0.4);
    cursor: not-allowed;
    box-shadow: none;
  }
`

const CreateOrganizationModal = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1)
  const [formValues, setFormValues] = useState({
    name: '',
    type: 'Personal',
    logoFile: null,
    logoName: '',
    logoPreviewUrl: '',
    headerFile: null,
    headerName: '',
    headerPreviewUrl: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    discord: '',
    twitch: ''
  })
  const logoInputRef = useRef(null)
  const headerInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (formValues.logoPreviewUrl) URL.revokeObjectURL(formValues.logoPreviewUrl)
      if (formValues.headerPreviewUrl) URL.revokeObjectURL(formValues.headerPreviewUrl)
    }
  }, [formValues.logoPreviewUrl, formValues.headerPreviewUrl])

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setFormValues({
        name: '',
        type: 'Personal',
        logoFile: null,
        logoName: '',
        logoPreviewUrl: '',
        headerFile: null,
        headerName: '',
        headerPreviewUrl: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        twitter: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        discord: '',
        twitch: ''
      })
      if (logoInputRef.current) logoInputRef.current.value = ''
      if (headerInputRef.current) headerInputRef.current.value = ''
    }
  }, [isOpen])

  const updateField = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }))
  }

  const handleLogo = (e, opts) => {
    if (opts?.remove) {
      if (formValues.logoPreviewUrl) URL.revokeObjectURL(formValues.logoPreviewUrl)
      updateField('logoFile', null)
      updateField('logoName', '')
      updateField('logoPreviewUrl', '')
      if (logoInputRef.current) logoInputRef.current.value = ''
      return
    }
    if (e?.target?.dataset?.reupload !== undefined) {
      logoInputRef.current?.click()
      return
    }
    const file = e?.target?.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (formValues.logoPreviewUrl) URL.revokeObjectURL(formValues.logoPreviewUrl)
    updateField('logoFile', file)
    updateField('logoName', file.name)
    updateField('logoPreviewUrl', url)
  }

  const handleHeader = (e, opts) => {
    if (opts?.remove) {
      if (formValues.headerPreviewUrl) URL.revokeObjectURL(formValues.headerPreviewUrl)
      updateField('headerFile', null)
      updateField('headerName', '')
      updateField('headerPreviewUrl', '')
      if (headerInputRef.current) headerInputRef.current.value = ''
      return
    }
    if (e?.target?.dataset?.reupload !== undefined) {
      headerInputRef.current?.click()
      return
    }
    const file = e?.target?.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (formValues.headerPreviewUrl) URL.revokeObjectURL(formValues.headerPreviewUrl)
    updateField('headerFile', file)
    updateField('headerName', file.name)
    updateField('headerPreviewUrl', url)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formValues)
    onClose?.()
  }

  return (
    <Overlay $isOpen={isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose} aria-label="Close create organization modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </CloseButton>
        <Title>Create an Organizer profile</Title>
        <Subtitle>Creating an Organization helps you house and manage all your tournaments.</Subtitle>
        <StepIndicator>
          {[1, 2, 3].map(index => (
            <StepDot key={index} $active={step === index} />
          ))}
        </StepIndicator>
        <FormSection>
          {step === 1 ? (
            <>
              <FieldGroup>
                <FieldLabel>Organization Name</FieldLabel>
                <Input placeholder="Enter organization name" value={formValues.name} onChange={e => updateField('name', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Organization Type</FieldLabel>
                <Select value={formValues.type} onChange={e => updateField('type', e.target.value)}>
                  <option value="Personal">Personal</option>
                  <option value="Company">Company</option>
                  <option value="Esports Team">Esports Team</option>
                  <option value="Community">Community</option>
                  <option value="School/University">School/University</option>
                </Select>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Logo</FieldLabel>
                {formValues.logoPreviewUrl ? (
                  <ImagePreview>
                    <PreviewImg src={formValues.logoPreviewUrl} alt="Logo preview" $logo />
                    <PreviewToolbar>
                      <SmallButton onClick={handleLogo} data-reupload>Change</SmallButton>
                      <SmallButton onClick={(e) => handleLogo(e, { remove: true })}>Remove</SmallButton>
                    </PreviewToolbar>
                  </ImagePreview>
                ) : (
                  <UploadBox>
                    <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogo} />
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
                      <circle cx="12" cy="11" r="3" />
                      <path d="M3 16l4-4 3 3 5-5 4 4" />
                    </svg>
                    <span>Logo 100px X 100px</span>
                  </UploadBox>
                )}
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Header Image</FieldLabel>
                {formValues.headerPreviewUrl ? (
                  <ImagePreview>
                    <PreviewImg src={formValues.headerPreviewUrl} alt="Header preview" />
                    <PreviewToolbar>
                      <SmallButton onClick={handleHeader} data-reupload>Change</SmallButton>
                      <SmallButton onClick={(e) => handleHeader(e, { remove: true })}>Remove</SmallButton>
                    </PreviewToolbar>
                  </ImagePreview>
                ) : (
                  <UploadBox>
                    <input ref={headerInputRef} type="file" accept="image/*" onChange={handleHeader} />
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
                      <circle cx="12" cy="11" r="3" />
                      <path d="M3 16l4-4 3 3 5-5 4 4" />
                    </svg>
                    <span>Header Image 1150px X 380px</span>
                  </UploadBox>
                )}
              </FieldGroup>
            </>
          ) : step === 2 ? (
            <>
              <FieldGroup>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="Enter email address" value={formValues.email} onChange={e => updateField('email', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Phone</FieldLabel>
                <Input type="tel" placeholder="Enter phone number" value={formValues.phone} onChange={e => updateField('phone', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Website</FieldLabel>
                <Input type="url" placeholder="https://example.com" value={formValues.website} onChange={e => updateField('website', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Address</FieldLabel>
                <Input placeholder="Enter street address" value={formValues.address} onChange={e => updateField('address', e.target.value)} />
              </FieldGroup>
              <FieldRow>
                <FieldGroup>
                  <FieldLabel>City</FieldLabel>
                  <Input placeholder="Enter city" value={formValues.city} onChange={e => updateField('city', e.target.value)} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>State/Province</FieldLabel>
                  <Input placeholder="Enter state or province" value={formValues.state} onChange={e => updateField('state', e.target.value)} />
                </FieldGroup>
              </FieldRow>
              <FieldRow>
                <FieldGroup>
                  <FieldLabel>Country</FieldLabel>
                  <Input placeholder="Enter country" value={formValues.country} onChange={e => updateField('country', e.target.value)} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Zip/Postal Code</FieldLabel>
                  <Input placeholder="Enter zip or postal code" value={formValues.zipCode} onChange={e => updateField('zipCode', e.target.value)} />
                </FieldGroup>
              </FieldRow>
            </>
          ) : (
            <>
            <FieldGroup>
                <FieldLabel>Discord</FieldLabel>
                <Input type="url" placeholder="https://discord.gg/invite" value={formValues.discord} onChange={e => updateField('discord', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Twitch</FieldLabel>
                <Input type="url" placeholder="https://twitch.tv/username" value={formValues.twitch} onChange={e => updateField('twitch', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Twitter</FieldLabel>
                <Input type="url" placeholder="https://twitter.com/username" value={formValues.twitter} onChange={e => updateField('twitter', e.target.value)} />
              </FieldGroup>
               <FieldGroup>
                <FieldLabel>Instagram</FieldLabel>
                <Input type="url" placeholder="https://instagram.com/username" value={formValues.instagram} onChange={e => updateField('instagram', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>LinkedIn</FieldLabel>
                <Input type="url" placeholder="https://linkedin.com/company/username" value={formValues.linkedin} onChange={e => updateField('linkedin', e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>YouTube</FieldLabel>
                <Input type="url" placeholder="https://youtube.com/@username" value={formValues.youtube} onChange={e => updateField('youtube', e.target.value)} />
              </FieldGroup>
              
            </>
          )}
        </FormSection>
        <ButtonRow>
          {step === 1 ? (
            <GhostButton onClick={onClose}>Cancel</GhostButton>
          ) : (
            <GhostButton onClick={handleBack}>Back</GhostButton>
          )}
          <PrimaryButton onClick={step === 3 ? handleSubmit : handleNext}>
            {step === 3 ? 'Submit' : 'Next'}
          </PrimaryButton>
        </ButtonRow>
      </ModalContainer>
    </Overlay>
  )
}

export default CreateOrganizationModal
