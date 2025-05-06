import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Container,
    FormControl,
    Paper,
    styled,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import { CommunityCategory } from "types/community";

export function useCommunityStyles() {
}

// 스타일 정의
export const StyledContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
}));

export const HeroSection = styled(Box)(({theme}) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(5),
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-30px',
        left: '0',
        width: '100%',
        height: '200px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: -1,
    }
}));

export const CategoryTabs = styled(Tabs)(({theme}) => ({
    marginBottom: theme.spacing(4),
    '& .MuiTabs-indicator': {
        backgroundColor: '#FF9800',
    },
    '& .Mui-selected': {
        color: '#FF9800',
        fontWeight: 'bold',
    }
}));

export const SearchBox = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(1, 2),
    borderRadius: '50px',
    boxShadow: '0 2px 10px rgba(255, 152, 0, 0.15)',
}));

export const CommunityCard = styled(Card)(({theme}) => ({
    marginBottom: theme.spacing(2),
    borderRadius: '12px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 12px rgba(255, 152, 0, 0.15)',
    }
}));


export const TypeChip = styled(Chip)<{ category: CommunityCategory }>(({category, theme}) => ({
    backgroundColor: category === CommunityCategory.INFORMATION ? '#FFE0B2' : '#FFCCBC',
    color: category === CommunityCategory.INFORMATION ? '#E65100' : '#D84315',
    fontWeight: 'bold',
    height: '24px'
}));

export const CardFooter = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    borderTop: '1px solid #F5F5F5',
}));

export const StyledAvatar = styled(Avatar)(({theme}) => ({
    width: 28,
    height: 28,
    backgroundColor: '#FFA726',
    fontSize: '0.8rem',
    marginRight: theme.spacing(1),
}));

export const StyledButton = styled(Button)(({theme}) => ({
    backgroundColor: '#FF9800',
    color: 'white',
    borderRadius: '25px',
    padding: theme.spacing(1, 3),
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#F57C00',
    }
}));

export const LoadingWrapper = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(5),
}));

export const EmptyStateBox = styled(Box)(({theme}) => ({
    padding: theme.spacing(6),
    textAlign: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: '12px',
}));



// 스타일 컴포넌트

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    color: '#FF9800',
}));

export const FormSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#FFB74D',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FF9800',
        },
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: '#FF9800',
    },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#FFB74D',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FF9800',
        },
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: '#FF9800',
    },
}));

export const AttachmentButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FFF3E0',
    color: '#FF9800',
    padding: theme.spacing(1, 2),
    borderRadius: 8,
    marginRight: theme.spacing(2),
    '&:hover': {
        backgroundColor: '#FFE0B2',
    },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FF9800',
    color: 'white',
    padding: theme.spacing(1.5, 4),
    borderRadius: 8,
    '&:hover': {
        backgroundColor: '#F57C00',
    },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
    color: '#757575',
    padding: theme.spacing(1.5, 4),
    borderRadius: 8,
    marginRight: theme.spacing(2),
    '&:hover': {
        backgroundColor: '#EEEEEE',
    },
}));