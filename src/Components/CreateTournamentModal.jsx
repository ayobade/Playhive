import React, { useState, useEffect, useRef } from 'react'
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

const FileUpload = styled.label`
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
`

const PreviewImg = styled.img`
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
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

const BannerIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 24px;
    height: 24px;
    color: rgba(255, 255, 255, 0.85);
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 560px) {
    flex-direction: column-reverse;
    button {
      width: 100%;
    }
  }
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

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const StepContent = ({ step, formValues, updateField, handleFile }) => {
  if (step === 1) {
    return (
      <FormSection>
        <FieldGroup>
          <FieldLabel>Organizer</FieldLabel>
          <Select value={formValues.organizer} onChange={e => updateField('organizer', e.target.value)}>
            <option value="">Select organizer</option>
            <option value="Bobby Swagger INC">Bobby Swagger INC</option>
            <option value="PlayHive Global">PlayHive Global</option>
            <option value="Community League">Community League</option>
          </Select>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Tournament Name</FieldLabel>
          <Input
            placeholder="Enter tournament name"
            value={formValues.tournamentName}
            onChange={e => updateField('tournamentName', e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Game</FieldLabel>
          <Select value={formValues.game} onChange={e => updateField('game', e.target.value)}>
            <option value="">Select game</option>
            <option value="Pubg Mobile">Pubg Mobile</option>
            <option value="Call of Duty">Call of Duty</option>
            <option value="Valorant">Valorant</option>
            <option value="Apex Legends">Apex Legends</option>
          </Select>
        </FieldGroup>
        <TwoColumn>
          <FieldGroup>
            <FieldLabel>Date</FieldLabel>
            <Input
              type="date"
              value={formValues.date}
              onChange={e => updateField('date', e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Time</FieldLabel>
            <Input
              type="time"
              value={formValues.time}
              onChange={e => updateField('time', e.target.value)}
            />
          </FieldGroup>
        </TwoColumn>
        <FieldGroup>
          <FieldLabel>Header Image</FieldLabel>
          {formValues.bannerPreviewUrl ? (
            <ImagePreview>
              <PreviewImg src={formValues.bannerPreviewUrl} alt="Header preview" />
              <PreviewToolbar>
                <SmallButton onClick={handleFile} data-reupload>Change</SmallButton>
                <SmallButton onClick={(e) => handleFile(e, { remove: true })}>Remove</SmallButton>
              </PreviewToolbar>
            </ImagePreview>
          ) : (
            <FileUpload>
              <input type="file" accept="image/*" onChange={handleFile} />
              <BannerIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M3 16l4-4 3 3 5-5 4 4" />
                </svg>
              </BannerIcon>
              <span>{formValues.bannerName || 'Header Image 1150px x 380px'}</span>
            </FileUpload>
          )}
        </FieldGroup>
      </FormSection>
    )
  }

  if (step === 2) {
    return (
      <FormSection>
        <TwoColumn>
          <FieldGroup>
            <FieldLabel>Region</FieldLabel>
            <Select value={formValues.region} onChange={e => updateField('region', e.target.value)}>
              <option value="">Select region</option>
              <option value="Global">Global</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
            </Select>
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Tournament Format</FieldLabel>
            <Select value={formValues.format} onChange={e => updateField('format', e.target.value)}>
              <option value="">Select format</option>
              <option value="4 x 4 Team Matches">4 x 4 Team Matches</option>
              <option value="Battle Royale">Battle Royale</option>
              <option value="Round Robin">Round Robin</option>
              <option value="Elimination Bracket">Elimination Bracket</option>
            </Select>
          </FieldGroup>
        </TwoColumn>
        <TwoColumn>
          <FieldGroup>
            <FieldLabel>Number of Teams</FieldLabel>
            <Input
              type="number"
              min="1"
              value={formValues.teamCount}
              onChange={e => updateField('teamCount', e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Prize Pool</FieldLabel>
            <Input
              type="number"
              min="0"
              value={formValues.prizePool}
              onChange={e => updateField('prizePool', e.target.value)}
              placeholder="30000"
            />
          </FieldGroup>
        </TwoColumn>
        <FieldGroup>
          <FieldLabel>Entry Fee</FieldLabel>
          <TwoColumn>
            <Select value={formValues.entryFeeCurrency} onChange={e => updateField('entryFeeCurrency', e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="NGN">NGN</option>
              <option value="KES">KES</option>
            </Select>
            <Input
              type="number"
              min="0"
              value={formValues.entryFee}
              onChange={e => updateField('entryFee', e.target.value)}
              placeholder="0"
            />
          </TwoColumn>
        </FieldGroup>
        <TwoColumn>
          <FieldGroup>
            <FieldLabel>Gameplay Mode</FieldLabel>
            <Select value={formValues.gameplayMode} onChange={e => updateField('gameplayMode', e.target.value)}>
              <option value="">Select mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </Select>
          </FieldGroup>
        </TwoColumn>
      </FormSection>
    )
  }

  return (
    <FormSection>
      <FieldGroup>
        <FieldLabel>Review & Submit</FieldLabel>
        <div style={{
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(21, 26, 31, 0.8)',
          padding: '24px',
          fontFamily: 'Inter, sans-serif',
          color: '#d6dae2',
          lineHeight: 1.6
        }}>
          <strong>Tournament Summary</strong>
          <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
            <span>Tournament: {formValues.tournamentName || '—'}</span>
            <span>Organizer: {formValues.organizer || '—'}</span>
            <span>Game: {formValues.game || '—'}</span>
            <span>Date & Time: {formValues.date || '—'} {formValues.time || ''}</span>
            <span>Region: {formValues.region || '—'}</span>
            <span>Format: {formValues.format || '—'}</span>
            <span>Teams: {formValues.teamCount || '—'}</span>
            <span>Prize Pool: {formValues.prizePool ? `$${Number(formValues.prizePool).toLocaleString()}` : '—'}</span>
            <span>Entry Fee: {formValues.entryFee ? `${formValues.entryFeeCurrency} ${Number(formValues.entryFee).toLocaleString()}` : 'Free'}</span>
          </div>
        </div>
      </FieldGroup>
    </FormSection>
  )
}

const CreateTournamentModal = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1)
  const fileInputRef = useRef(null)
  const [formValues, setFormValues] = useState({
    organizer: '',
    tournamentName: '',
    game: '',
    date: '',
    time: '',
    bannerFile: null,
    bannerName: '',
    bannerPreviewUrl: '',
    region: '',
    format: '',
    teamCount: '',
    prizePool: '',
    entryFeeCurrency: 'USD',
    entryFee: '',
    gameplayMode: ''
  })

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
    if (!isOpen) {
      setStep(1)
      setFormValues({
        organizer: '',
        tournamentName: '',
        game: '',
        date: '',
        time: '',
        bannerFile: null,
        bannerName: '',
        bannerPreviewUrl: '',
        region: '',
        format: '',
        teamCount: '',
        prizePool: '',
        entryFeeCurrency: 'USD',
        entryFee: '',
        gameplayMode: ''
      })
    }
  }, [isOpen])

  const updateField = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    return () => {
      if (formValues.bannerPreviewUrl) {
        URL.revokeObjectURL(formValues.bannerPreviewUrl)
      }
    }
  }, [formValues.bannerPreviewUrl])

  const triggerReupload = () => {
    // Create a hidden input dynamically to re-trigger file chooser
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFile = (event, opts) => {
    if (opts?.remove) {
      if (formValues.bannerPreviewUrl) URL.revokeObjectURL(formValues.bannerPreviewUrl)
      updateField('bannerFile', null)
      updateField('bannerName', '')
      updateField('bannerPreviewUrl', '')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    if (event?.target?.dataset?.reupload !== undefined) {
      // "Change" button pressed inside preview
      triggerReupload()
      return
    }
    const file = event?.target?.files?.[0]
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    if (formValues.bannerPreviewUrl) URL.revokeObjectURL(formValues.bannerPreviewUrl)
    updateField('bannerFile', file)
    updateField('bannerName', file.name)
    updateField('bannerPreviewUrl', objectUrl)
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
        <CloseButton onClick={onClose} aria-label="Close create tournament modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </CloseButton>
        <Title>Create a Tournament</Title>
        <Subtitle>Creating an organization helps you house and manage all your tournaments.</Subtitle>
        <StepIndicator>
          {[1, 2, 3].map(index => (
            <StepDot key={index} $active={step === index} />
          ))}
        </StepIndicator>
        <StepContent
          step={step}
          formValues={formValues}
          updateField={updateField}
          handleFile={handleFile}
        />
        {/* Hidden input for re-upload trigger */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        <ButtonRow>
          {step === 1 ? (
            <GhostButton onClick={onClose}>Cancel</GhostButton>
          ) : (
            <GhostButton onClick={handleBack}>Back</GhostButton>
          )}
          <PrimaryButton
            onClick={step === 3 ? handleSubmit : handleNext}
          >
            {step === 3 ? 'Submit' : 'Next'}
          </PrimaryButton>
        </ButtonRow>
      </ModalContainer>
    </Overlay>
  )
}

export default CreateTournamentModal


