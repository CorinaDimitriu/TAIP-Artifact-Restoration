/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EObject;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Painting</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getId <em>Id</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImageName <em>Image Name</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getDescription <em>Description</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getAuthor <em>Author</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getNoVisualizations <em>No Visualizations</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getComments <em>Comments</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImage <em>Image</em>}</li>
 * </ul>
 *
 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting()
 * @model
 * @generated
 */
public interface Painting extends EObject {
	/**
	 * Returns the value of the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Id</em>' attribute.
	 * @see #setId(String)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting_Id()
	 * @model
	 * @generated
	 */
	String getId();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getId <em>Id</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Id</em>' attribute.
	 * @see #getId()
	 * @generated
	 */
	void setId(String value);

	/**
	 * Returns the value of the '<em><b>Image Name</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Image Name</em>' attribute.
	 * @see #setImageName(String)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting_ImageName()
	 * @model
	 * @generated
	 */
	String getImageName();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImageName <em>Image Name</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Image Name</em>' attribute.
	 * @see #getImageName()
	 * @generated
	 */
	void setImageName(String value);

	/**
	 * Returns the value of the '<em><b>Description</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Description</em>' attribute.
	 * @see #setDescription(String)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting_Description()
	 * @model
	 * @generated
	 */
	String getDescription();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getDescription <em>Description</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Description</em>' attribute.
	 * @see #getDescription()
	 * @generated
	 */
	void setDescription(String value);

	/**
	 * Returns the value of the '<em><b>Author</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Author</em>' attribute.
	 * @see #setAuthor(String)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting_Author()
	 * @model
	 * @generated
	 */
	String getAuthor();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getAuthor <em>Author</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Author</em>' attribute.
	 * @see #getAuthor()
	 * @generated
	 */
	void setAuthor(String value);

	/**
	 * Returns the value of the '<em><b>No Visualizations</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>No Visualizations</em>' attribute.
	 * @see #setNoVisualizations(int)
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting_NoVisualizations()
	 * @model
	 * @generated
	 */
	int getNoVisualizations();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getNoVisualizations <em>No Visualizations</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>No Visualizations</em>' attribute.
	 * @see #getNoVisualizations()
	 * @generated
	 */
	void setNoVisualizations(int value);

	/**
	 * Returns the value of the '<em><b>Comments</b></em>' attribute list.
	 * The list contents are of type {@link java.lang.String}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Comments</em>' attribute list.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting_Comments()
	 * @model
	 * @generated
	 */
	EList<String> getComments();

	/**
	 * Returns the value of the '<em><b>Image</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Image</em>' attribute.
	 * @see #setImage(byte[])
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getPainting_Image()
	 * @model
	 * @generated
	 */
	byte[] getImage();

	/**
	 * Sets the value of the '{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting#getImage <em>Image</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Image</em>' attribute.
	 * @see #getImage()
	 * @generated
	 */
	void setImage(byte[] value);

} // Painting
