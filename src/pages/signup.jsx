import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import signupImg from '../assets/signupimg.jpg'

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  
  position: relative;
  z-index: 10;
  
  @media (max-width: 968px) {
    flex-direction: column;
  }
`

const LeftSection = styled.div`
  width: 80%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 968px) {
    display: none;
  }
`

const LeftImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${signupImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const RightSection = styled.div`
  width: 550px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 200px 50px 40px 50px;
  position: relative;
  
  @media (max-width: 968px) {
    width: 100%;
    padding: 200px 30px 30px 30px;
  }

  @media (max-width: 480px) {
    height: 100vh;
    padding: 100px 20px 20px 20px;
  }
`

const BackButton = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  color: #66B22E;
  transition: all 0.3s ease;
  z-index: 10;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    color: #5C8D30;
    transform: translateX(-2px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 968px) {
    top: 20px;
    left: 20px;
  }
`

const LogoLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 32px;
  align-self: center;
  text-align: center;
  width: 100%;
  display: block;
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`

const Logo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #66B22E;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .play {
    color: #0A0E12;
  }
  
  .hive {
    color: #66B22E;
  }
  
  &:hover {
    opacity: 0.8;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #0A0E12;
  margin: 0 0 32px 0;
  text-align: center;
  width: 100%;
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`

const SocialButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  background: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #0A0E12;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #66B22E;
    background: rgba(102, 178, 46, 0.08);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 40px;
`

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const InputLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #0A0E12;

  margin-top: 16px;
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  background: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #0A0E12;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #66B22E;
    box-shadow: 0 0 0 3px rgba(102, 178, 46, 0.1);
  }
  
  &::placeholder {
    color: #999999;
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  
  &:hover {
    color: #0A0E12;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const SignUpButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  background: #66B22E;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 24px;
  
  &:hover {
    background: #5C8D30;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 178, 46, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 28px;
`

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #66B22E;
`

const CheckboxLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #666666;
  line-height: 1.5;
  cursor: pointer;
  flex: 1;
`

const LegalText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #666666;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 1.6;
  
  a {
    color: #66B22E;
    text-decoration: underline;
    font-weight: 500;
    
    &:hover {
      color: #5C8D30;
    }
  }
`

const LoginLink = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666666;
  text-align: center;
  margin-bottom: 20px;
  
  a {
    color: #66B22E;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
      color: #5C8D30;
    }
  }
`

const CookiesLink = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  text-align: center;
  
  a {
    color: #66B22E;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
      color: #5C8D30;
    }
  }
`

const SignupPage = () => {
    const navigate = useNavigate()
    const [newsletterChecked, setNewsletterChecked] = useState(false)
    const [showEmailForm, setShowEmailForm] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleEmailClick = () => {
        setShowEmailForm(true)
    }

    const handleBackClick = () => {
        setShowEmailForm(false)
        setEmail('')
        setPassword('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/dashboard')
    }

    const handleGoogleClick = () => {
        navigate('/dashboard')
    }

    return (
        <SignupContainer>
            <LeftSection>
                <LeftImage />
            </LeftSection>
            <RightSection>
                {showEmailForm && (
                    <BackButton onClick={handleBackClick}>
                        <BackArrowIcon />
                        Back
                    </BackButton>
                )}
                <LogoLink to="/">
                    <Logo>
                        <span className="play">Play</span>
                        <span className="hive">Hive</span>
                    </Logo>
                </LogoLink>
                <Title>Create an account</Title>
                
                {!showEmailForm ? (
                    <>
                        <ButtonContainer>
                            <SocialButton onClick={handleGoogleClick}>
                                <GoogleIcon />
                                Continue with Google
                            </SocialButton>
                            <SocialButton onClick={handleEmailClick}>
                                <EmailIcon />
                                Continue with email
                            </SocialButton>
                        </ButtonContainer>
                        
                        <CheckboxContainer>
                            <Checkbox
                                type="checkbox"
                                id="newsletter"
                                checked={newsletterChecked}
                                onChange={(e) => setNewsletterChecked(e.target.checked)}
                            />
                            <CheckboxLabel htmlFor="newsletter">
                                I do not wish to receive news and promotions from PlayHive by email.
                            </CheckboxLabel>
                        </CheckboxContainer>
                        
                        <LegalText>
                            By continuing, you agree to PlayHive Terms of Use and Privacy Policy.
                        </LegalText>
                    </>
                ) : (
                    <>
                        <FormContainer>
                            <form onSubmit={handleSubmit}>
                                <InputGroup>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <InputWrapper>
                                        <FormInput
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </InputWrapper>
                                </InputGroup>
                                
                                <InputGroup>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <InputWrapper>
                                        <FormInput
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <PasswordToggle
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </PasswordToggle>
                                    </InputWrapper>
                                </InputGroup>
                                
                                <SignUpButton type="submit">Sign up</SignUpButton>
                            </form>
                        </FormContainer>
                        
                        <LegalText>
                            By clicking the "Sign up" button, you are creating a PlayHive account and therefore you agree to PlayHive <Link to="/terms">Terms of Use</Link> and <Link to="/privacy">Privacy Policy</Link>.
                        </LegalText>
                    </>
                )}
                
                <LoginLink>
                    Already have an account? <Link to="/login">Log in</Link>
                </LoginLink>
                
                <CookiesLink>
                    <Link to="/cookies">Cookies settings</Link>
                </CookiesLink>
            </RightSection>
        </SignupContainer>
    )
}

export default SignupPage

