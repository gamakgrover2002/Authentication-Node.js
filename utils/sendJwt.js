export const sendTokens = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
  };