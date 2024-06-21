import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton, Avatar, Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Usuario } from '../../../../data';
import EditIcon from '../../../../assets/pencil.svg?react';
import SignOutAlt from '../../../../assets/sign-out-alt.svg?react';
import { theme } from '../../../../styles/theme';
import { BoxHeader, ButtonsWrapper, VerticalLine } from './styles';
import CrossSmall from '../../../../assets/cross-small.svg?react';

interface UsuarioFormEditProps {
    usuario: Usuario;
}

export const UsuarioFormEdit: React.FC<UsuarioFormEditProps> = ({ usuario }) => {

  const [formData, setFormData] = useState<Usuario>(usuario);
  const [imageSelected, setImageSelected] = useState(usuario.fotoPerfilUrl);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Dados salvos:', formData);
  };

  const handleCancel = () => {
    setFormData(usuario);
  };

  const handleLogout = () =>{
    console.log("sai");
  }

  //imagem
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageSelected(URL.createObjectURL(event.target.files[0]));
      handleClose();
    }
  };

  return (
    <Container maxWidth="lg" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <BoxHeader>
        <Box position="relative" sx={{ boxShadow: '0 4px 50px rgba(0, 0, 0, 0.25)', borderRadius: '50%' }}>
          <Avatar src={imageSelected || ''} alt={formData.nome} sx={{ width: 140, height: 140 }} />
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '12px 16px',
              background: theme.colors.brown[400],
            }}

            onClick={() => handleOpen()}
          >
            <EditIcon height={16} width={16} />
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ color: theme.colors.black[600], fontWeight: 700 }}>{formData.nome}</Typography>
        <VerticalLine />
        <Button
          onClick={handleLogout}
          sx={{ textTransform: 'none', display: 'flex', gap: '12px'  }}
        >
            <SignOutAlt />
            <Typography variant="h6" sx={{ color: theme.colors.red[400], fontWeight: 700 }}>Sair</Typography>
        </Button>
        </BoxHeader>
        <Grid component="form" container spacing={8}>

            <Grid item xs={16} sm={8} md={4}> <TextField
            name="nome"
            label="Nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            /> </Grid>
            <Grid item xs={16} sm={6} md={8}> <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            /></Grid>
            <Grid item xs={16} sm={6} md={6}>
                <TextField
                name="dataNascimento"
                label="Data de Nascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
           <Grid item xs={16} sm={6} md={6}>
                <TextField
                name="celular"
                label="Celular"
                value={formData.celular || ''}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
        </Grid>
        <ButtonsWrapper>
            <Button variant="contained" style={{ background: theme.colors.white[500], minWidth: '200px' }} onClick={handleCancel}>
                <Typography variant="button" style={{ color: theme.colors.black[600] }}>Cancelar</Typography>
            </Button>
            <Button variant="contained" style={{ background: theme.colors.black[600], minWidth: '200px' }} onClick={handleSave}>
                <Typography variant="button">Salvar</Typography>
            </Button>
        </ButtonsWrapper>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" style={{ color: theme.colors.black[600], fontWeight: 600 }}>  Selecionar Imagem </Typography>
                <CrossSmall onClick={handleClose} />
            </DialogTitle>
            <DialogContent>
                <Button variant="outlined" component="label" style={{ padding: '16px 80px' }}>
                    Buscar Arquivo
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
            </DialogContent>
        </Dialog>
    </Container>
  );
};
